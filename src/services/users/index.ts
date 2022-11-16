import {$api} from "../../http";
import {User} from "../../types/user";

export class UsersService {
  public static fetchAll() {
    return $api.get<User[]>(`/users`);
  }
  public static remove(id: number) {
    return $api.delete<User[]>(`/users/${id}`);
  }
}
