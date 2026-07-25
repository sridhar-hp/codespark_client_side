import { useSelector, useDispatch } from 'react-redux';
import {
  registerThunk,
  loginThunk,
  logoutThunk,
  refreshThunk,
  fetchProfileThunk,
} from '../redux/authThunks';
import { clearAuth, clearAuthError } from '../redux/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const register = (name, email, password) => dispatch(registerThunk({ name, email, password }));
  const login = (email, password) => dispatch(loginThunk({ email, password }));
  const logout = () => dispatch(logoutThunk());
  const refreshToken = () => dispatch(refreshThunk());
  const fetchProfile = () => dispatch(fetchProfileThunk());
  const resetAuth = () => dispatch(clearAuth());
  const resetError = () => dispatch(clearAuthError());

  return {
    ...authState,
    register,
    login,
    logout,
    refreshToken,
    fetchProfile,
    resetAuth,
    resetError,
  };
};

export default useAuth;
