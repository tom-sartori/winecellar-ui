<template>
  <div>

    <div v-show="isLoading" ref="loading" class="progress">
      <div class="indeterminate"></div>
    </div>

    <canvas
        ref="canvas"
        v-on:mousemove="handlerMousemoveCanvas"
        v-on:click="handlerClickCanvas"
        v-on:keyup="handlerKeyupCanvas"
    ></canvas>

    <div>
      <button
          ref="buttonDraw"
          type="button"
          value="notDrawing"
          v-on:click="handlerClickDrawButton"
      >Dessiner</button>

      <button
          ref="buttonDelete"
          type="button"
          v-on:click="handlerClickDeleteButton"
      >Supprimer</button>
    </div>

    <!--    Used to close the compartment list, to reveal the wall list.-->
    <button @click="handlerClickButtonClose" v-if="selectedCompartmentId">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <bottle-list
        :wall-id="wallId"
        :compartment-id="selectedCompartmentId"
        :is-bottle-list-updated="isBottleListUpdated"
    ></bottle-list>

    <bottle-creation
        v-if="selectedCompartmentId"
        :compartment-id="selectedCompartmentId"
        @change-isBottleListUpdated="switchIsBottleListUpdated"
    ></bottle-creation>

    <p>{{ errorResponse }}</p>
  </div>
</template>

<script>
import Point from '../../objects/Point'
import Polygon from '../../objects/Polygon'
import CompartmentService from "../../services/Compartment.service"
import BottleList from "@/components/Bottle/Bottle.list";
import BottleCreation from "@/components/Bottle/Bottle.creation";


export default {
  name: "WallDetail",
  components: { BottleCreation, BottleList },
  props: {
    wallId: {
      type: Number,
      required: true,
    },
    srcImage: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      content: '',
      errorResponse: '',
      isInitialised: false,
      selectedCompartmentId: null,
      isLoading: true,

      // Modified by $emit from bottle.creation, when the user add a bottle to an compartment. So the bottle.list has to be updated.
      isBottleListUpdated: true,

      canvas: null,
      context: null,

      // Point are added to the list when the user is drawing a polygon and clicking on the canvas.
      listPointPolygon: [],
      listPolygon: [],

      // Different colors of polygon.
      polygonColor: 'rgb(255, 255, 255, 0.4)',
      hoverPolygonColor: 'rgb(0, 0, 0, 0.8)',
      hoverDeletePolygonColor: 'rgb(217, 30, 24, 0.8)',
      drawingPolygonColor: 'rgba(44, 130, 201, 0.4)',
      selectedPolygonColor: 'rgba(3,201,169,0.4)',

      // Used to get the cursor place when the user draw back the polygon (rollbackDraw(...)).
      lastMouseEvent: null,


      // Buttons.

      // Button used to draw a polygon.
      buttonDraw: null,
      isDrawing: false,

      // Button used to delete a polygon.
      buttonDelete: null,
      isDeleting: false
    }
  },
  mounted() {
    // Canvas and context initialisation.
    // this.canvas = document.getElementById('c')
    this.canvas = this.$refs.canvas
    this.canvas.innexText = 'Your browser does not support the HTML5 canvas tag. ';
    this.canvas.tabIndex = 1

    this.context = this.canvas.getContext('2d')

    // Add the wall's image in background.
    let background = new Image();
    background.src = this.srcImage;
    background.onload = () => {
      // Set the canvas's size equal to the image's size.
      this.canvas.height = background.height
      this.canvas.width = background.width
      this.canvas.style.background = 'url(' + this.srcImage + ')'
    }


    // Buttons.
    this.buttonDraw = this.$refs.buttonDraw
    this.buttonDelete = this.$refs.buttonDelete


    this.isLoading = true
    // Fetch the list of compartments for the 'wallID' and draw them.
    CompartmentService.getListCompartment(this.wallId)
        .then( (response) => {
              response.data.forEach( compartment => {
                this.listPointPolygon = compartment.points
                this.listPointPolygon.sort( (a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
                this.addPolygon(compartment.id)
              })
              this.isLoading = false
              this.isInitialised = true
            },
            (error) => {
              this.isLoading = false
              this.errorResponse =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString()
              this.isInitialised = true
            }
        )
  },
  methods: {
    /*****************************************************************************************************************
     * Canvas and polygon.
     */

    /**
     * Show the polygon in param.
     *
     * @param polygon : Polygon
     */
    showPolygon(polygon) {
      this.context.beginPath()
      this.setColor(polygon.path2d, this.isDrawing ? this.drawingPolygonColor : this.polygonColor)
      this.context.closePath()
    },

    /**
     * Create a polygon, show it, add it to the list listPolygon and refresh the canvas.
     * To create the polygon, use the points in the list listPointPolygon.
     */
    addPolygon(compartmentId) {
      if (this.listPointPolygon.length >= 3) {  // If the polygon is at least a triangle.
        let polygon = new Polygon(this.listPointPolygon)
        this.showPolygon(polygon)

        if (this.isInitialised) {
          // Send points of the polygon to the api to create a new compartment.
          CompartmentService.createCompartment(this.wallId, this.listPointPolygon)
              .then((response) => {
                    // Get the compartmentId from the api.
                    this.listPolygon.push({
                      compartmentId: response.data.id,
                      polygon: polygon
                    })
                    this.listPointPolygon = []
                    // this.refreshCanvas()
                  },
                  (error) => {
                    this.errorResponse =
                        (error.response && error.response.data && error.response.data.message) ||
                        error.message ||
                        error.toString()
                  }
              )
        }
        else  {
          // If not initialised, the compartmentId is in params. It has been gotten by a GET in compartment.service.
          this.listPolygon.push({
            compartmentId: compartmentId,
            polygon: polygon
          })
          this.listPointPolygon = []
          // this.refreshCanvas()
        }
      }
      this.refreshCanvas()
    },

    /**
     * Clear the canvas and color every polygon of the list listPolygon.
     */
    refreshCanvas() {
      this.clearCanvas()
      for (let i = 0; i < this.listPolygon.length; i++) {
        let polygon = this.listPolygon[i].polygon
        this.setColor(polygon.path2d, this.polygonColor)
      }
    },

    /**
     * Set the color of the (element : Path2d) in parameter.
     * Also change the default color of ctx, which will be used for the next elements added.
     *
     * @param polygon : Path2D
     * @param color type of :  css <color> || #HEXA || rgb(r, g, b) || regba(r, g, b, a)
     */
    setColor(polygon, color) {
      // Inside color
      this.context.fillStyle = color
      this.context.fill(polygon)

      // Border color
      this.context.strokeStyle = color
      this.context.stroke(polygon)
    },

    /**
     * Clear the canvas.
     */
    clearCanvas() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    /**
     * Called by press on the key 'Escape' on the canvas.
     * Restart the current draw.
     */
    restartDrawing() {
      this.listPointPolygon = []
      this.refreshCanvas()
    },

    /**
     * Called by press on the key 'Backspace' on the canvas.
     * While drawing, remove the last placed point.
     */
    rollbackDraw() {
      if (this.isDrawing) {
        this.listPointPolygon.pop()
        this.handlerMousemoveCanvas(this.lastMouseEvent)
      }
    },

    /***********************************************************************************************************************
     * Handlers.
     */

    /**
     * Handler called by mousemove on the canvas.
     * Color every polygon of listPolygon.
     * if (isDrawing) : show a current polygon which the user will create.
     *
     * @param event : MouseEvent
     */
    handlerMousemoveCanvas (event) {
      this.clearCanvas()
      this.lastMouseEvent = event  // Used by rollbackDraw(...).
      let isHovering = false

      for (let i = 0; i < this.listPolygon.length; i++) {
        let polygon = this.listPolygon[i].polygon
        if (this.selectedCompartmentId === this.listPolygon[i].compartmentId) {
          this.setColor(this.listPolygon[i].polygon.path2d, this.selectedPolygonColor)
        }
        else if (!this.isDrawing && this.context.isPointInPath(polygon.path2d, event.offsetX, event.offsetY)) {
          // If not drawing and hovering the polygon : listPolygon[i].
          this.setColor(polygon.path2d, this.isDeleting ? this.hoverDeletePolygonColor : this.hoverPolygonColor)
          isHovering = true
        }
        else {
          this.setColor(polygon.path2d, this.polygonColor)
        }
      }

      // If is drawing and has already added a point to draw a polygon.
      if (this.isDrawing && this.listPointPolygon.length > 0) {
        let listCurrentPoint = this.listPointPolygon.slice() // Copy by values.
        listCurrentPoint.push(new Point(event.offsetX, event.offsetY))

        this.showPolygon(new Polygon(listCurrentPoint))  // Show a polygon which the last point is the cursor.
      }
      if (isHovering) {
        if (this.isDeleting) {
          this.canvas.classList.add('cursorNotAllowed')
        }
        else {
          this.canvas.classList.add('cursorGrab')
        }
      }
      else {
        this.canvas.classList.remove('cursorGrab')
        this.canvas.classList.remove('cursorNotAllowed')
      }
    },


    /**
     * Handler called by click on the canvas.
     *
     * if (isDrawing) : Add the position of the click to the list listPointPolygon if the user is drawing.
     * if (isDeleting) : Delete the polygon clicked on.
     *
     * @param event : MouseEvent
     */
    handlerClickCanvas (event) {
      if (this.isDrawing) {
        this.listPointPolygon.push(new Point(event.offsetX, event.offsetY, this.listPointPolygon.length))
      }
      else if (this.isDeleting) {
        for (let i = 0; i < this.listPolygon.length; i++) {
          if (this.context.isPointInPath(this.listPolygon[i].polygon.path2d, event.offsetX, event.offsetY)) {
            // The compartment/polygon which the user has just clicked is this.listPolygon[i].
            // This element contains the compartmentId and the polygon.

            // Delete the compartment by sending request to the api.
            CompartmentService.deleteCompartment(this.listPolygon[i].compartmentId)
                .then((response) => {
                      if (response.status !== 204) {
                        console.log('Not deleted. ')
                      }
                      this.selectedCompartmentId = null // When we delete the compartment, we reset this.selectedCompartmentId.
                    },
                    (error) => {
                      this.errorResponse =
                          (error.response && error.response.data && error.response.data.message) ||
                          error.message ||
                          error.toString()
                    }
                )

            // Delete the compartment/polygon on the front.
            this.listPolygon.splice(i, 1)
            this.refreshCanvas()
            this.handlerClickDeleteButton()  // Switch the delete button.
          }
        }
      }
      else {
        // Not drawing and deleting so, the user is clicking for looking what is inside an compartment.
        for (let i = 0; i < this.listPolygon.length; i++) {
          if (this.context.isPointInPath(this.listPolygon[i].polygon.path2d, event.offsetX, event.offsetY)) {
            this.selectedCompartmentId = this.listPolygon[i].compartmentId
            this.refreshCanvas()
            this.setColor(this.listPolygon[i].polygon.path2d, this.selectedPolygonColor)
          }
        }
      }
    },
    handlerKeyupCanvas (event) {
      switch (event.key) {
        case 'Enter' :
          this.addPolygon()
          break
        case 'Escape' :
          this.restartDrawing()
          break
        case 'Backspace' :
          this.rollbackDraw()
          break
      }
    },

    switchIsBottleListUpdated () {
      this.isBottleListUpdated = !this.isBottleListUpdated
    },


    /***********************************************************************************************************************
     * Button handlers.
     */

    /**
     * Called by click on the draw button.
     * Switch the innerText and idDrawing.
     */
    handlerClickDrawButton () {
      if (this.isDeleting) {   // If deleting, switch it off.
        this.handlerClickDeleteButton()
      }

      if (this.isDrawing) {  // Create the polygon by clicking the button.
        this.addPolygon()
        this.buttonDraw.innerText = 'Dessiner'
        this.canvas.classList.remove('cursorCrosshair')
      }
      else {  // Draw polygon and switch button to 'Draw'.
        this.buttonDraw.innerText = 'Valider'
        this.canvas.classList.add('cursorCrosshair')
      }
      this.isDrawing = !this.isDrawing
    },


    /**
     * Called by click on the delete draw button.
     * Switch the innerText and isDeleting.
     */
    handlerClickDeleteButton () {
      if (this.isDrawing) {    // If drawing, switch it off.
        this.handlerClickDrawButton()
      }

      if (this.isDeleting) {
        this.buttonDelete.innerText = 'Supprimer un polygone'
      }
      else {
        this.buttonDelete.innerText = 'Stopper la suppression'
      }
      this.isDeleting = !this.isDeleting;
    },
    handlerClickButtonClose () {
      this.selectedCompartmentId = null
      this.refreshCanvas()
    }
  }
}


</script>

<style scoped>

canvas {
  border: black solid 1px;
  margin-top: 10px;
}

.cursorCrosshair {
  cursor: crosshair;
}

.cursorGrab {
  cursor: grab;
}

.cursorNotAllowed {
  cursor: not-allowed;
}
button {
  font-size: var(--normal-text-size);
  margin: 10px;
}

</style>
