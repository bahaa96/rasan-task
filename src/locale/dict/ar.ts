import KEYS from '../keys'

type Shape = {
  [key: string]: string 
};

const AR: Shape = {
  local: 'arabic',
  [KEYS.HOME_PAGE_TITLE]: 'الرئيسية',
  [KEYS.FAVORITES_PAGE_TITLE]: 'المفضلة',
  [KEYS.SETTINGS_PAGE_TITLE]: 'الخصائص',

  // Settings 
  [KEYS.SETTINGS_ITEM_CHANGE_LANGUAGE]: 'تغيير اللغة',
  [KEYS.SETTINGS_ITEM_FAVORITES]: 'المفضلة',
}

export default AR;