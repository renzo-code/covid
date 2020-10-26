export const ROLES = {
  ADMINISTRATOR: 1,
  CLIENT: 2,
  BUSINESS: 3,
  COURIER: 4,
  EMPLOYE: 5,
}

export const STATE = {
  ACTIVE: 1,
  BY_VERIFY: 2,
  INACTIVE: 3,
  LOCKED: 4,
  DISABLED: 5,
  IN_PROCESS: 6,
  SENDED: 7,
  DELIVERED: 8,
  CANCELED: 9
}

export const SERVER = 'http://18.222.225.213/uploads/'
// export const SERVER = 'https://500a246ef629.ngrok.io/uploads/'

export const STATE_ORDER = [
  {
    id: 6,
    name: 'IN PROCESS'
  },
  {
    id: 7,
    name: 'SENDED'
  },
  {
    id: 8,
    name: 'DELIVERED'
  },
  {
    id: 9,
    name: 'CANCELED'
  }
]

export const maps = [
  {
    id: 1,
    map: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  },
  {
    id: 2,
    map: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    id: 3,
    map: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
  },
  {
    id: 4,
    map: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'
  }
]

// export default ROLES
