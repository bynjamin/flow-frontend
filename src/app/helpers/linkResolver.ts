type UrlConfigItem = {
  list: string;
  detail: string;
};

type UrlConfig = {
  users: UrlConfigItem;
  userGroups: UrlConfigItem;
  roles: UrlConfigItem;
};

type Module = keyof UrlConfig;

const urlConfig: UrlConfig = {
  users: {
    list: '/users',
    detail: '/users/detail',
  },
  userGroups: {
    list: '/user-groups',
    detail: '/user-groups/detail',
  },
  roles: {
    list: '/roles',
    detail: '/roles/detail',
  },
};

export function getListUrl(module: Module) {
  return urlConfig[module].list;
}

export function getDetailUrl(module: Module, recordId: number) {
  return `${urlConfig[module].detail}/${recordId}`;
}
