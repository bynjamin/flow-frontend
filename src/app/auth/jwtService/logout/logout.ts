import { mainClient } from 'apollo-clients';
import { LOGOUT } from './logoutMutation';
// eslint-disable-next-line no-unused-vars
import { Logout as ResponseType } from './__generated__/Logout';

export const logout = async (): Promise<boolean> => {
  try {
    const { data, errors } = await mainClient.mutate<ResponseType>({
      mutation: LOGOUT,
    });
    console.log(data);
    console.log(errors);
    return data?.logout || false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
