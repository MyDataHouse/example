export const useUserStore = defineStore('user', () => {
  const user = reactive({ name: '', refresh_token: '' });

  const setUser = (info: Partial<typeof user>) => {
    // eslint-disable-next-line no-eq-null
    if (user == null || typeof user !== 'object') throw Error('用户信息设置错误');
    Object.assign(user, info);
  };

  return { user, setUser };
});
