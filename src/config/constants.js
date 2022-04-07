/**
 * Set all global constants.
 */

module.exports = {
    ROOT: {
        API: '/api',
        OBJECT: {
            BOTTLE: {
                BOTTLE: '/bottles',
                DESIGNATION: '/designations',
                VINEYARD: '/vineyards',
                TYPE_VIN: '/type-vin'
            },
            CELLAR: {
                CELLAR: '/cellars',
                WALL: '/walls',
                COMPARTMENT: '/compartments'
            },
            USER: {
                USER: '/users',
                ROLE: '/roles',
                AUTHENTICATION: '/auth',
                TEST: '/test'
            }
        },
        ACTION: {
            CREATE: '/create',
            FIND_ALL: '',
            FIND_BY_PK: '',
            FIND_BY_PK_BODY: '/find',
            UPDATE: '/update',
            PROMOTE: '/promote',
            DELETE: '/delete',
            SIGNUP: '/signup',
            SIGNIN: '/signin',
            REFRESH_TOKEN: '/refreshtoken'
        },
        PARAM: {
            ID: '/id/',
            NAME: '/name/',
            CELLAR_ID: '/cellar-id/',
            COMPARTMENT_ID: '/compartment-id/',
            WALL_ID: '/wall-id/'
        },
        IMAGE: {
            WALL_IMAGE_PATH: '/wall-image'
        }
    },
    AUTHENTICATION: {
        ROLES: ['user', 'admin']
    }
}
