import { call, put, takeEvery, all, delay } from "typed-redux-saga";
import { UsersService } from "../../services/users";
import {
  deleteUser,
  finishLoading,
  remove,
  setError,
  setUsers,
  startLoading
} from "./index";
import { AxiosError } from "axios";
import {$api} from "../../http";
import {User} from "../../types/user";

const UsersWithError = () => $api.get<User[]>(`/users/error`)

function* fetchUsers() {
  try {
    yield put(startLoading());
    const response = yield* call(UsersService.fetchAll);
    yield put(setUsers(response.data));
    yield put(finishLoading());
  } catch (error) {
    yield put({ type: "USER_FETCH_FAILED", payload: error });
  }
}

function* fetchUsersWithDelay() {
  try {
    yield put(startLoading());
    const response = yield* call(UsersService.fetchAll);
    yield delay(3000);
    yield put(setUsers(response.data));
  } catch (error) {
    yield put({ type: "USER_FETCH_FAILED", payload: error });
  } finally {
    yield put(finishLoading())
  }
}

function* fetchUsersWithError() {
  try {
    yield put(startLoading());
    const response = yield* call(UsersWithError);
    yield put(setUsers(response.data));
  } catch (error) {
    console.log(error)
    yield put(setError(error.message));
  } finally {
    yield put(finishLoading());
  }
}

// @ts-ignore
function* removeUser(action: any) {
  console.log(action.payload)
  try {
    yield put(startLoading())
    yield* call(UsersService.remove, action.payload);
    yield put(deleteUser(action.payload));
  } catch (error) {
    yield put({type: "USER_FETCH_FAILED", message: error.message});
  } finally {
    yield put(finishLoading())
  }
}

export function* usersSaga() {
  yield all([
    takeEvery("FETCH_USERS", fetchUsers),
    takeEvery("FETCH_USERS_WITH_DELAY", fetchUsersWithDelay),
    takeEvery("FETCH_USERS_WITH_ERROR", fetchUsersWithError),
    takeEvery("DELETE_USER", removeUser),
  ]);
}
