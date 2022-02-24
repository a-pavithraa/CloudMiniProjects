import { Route,  Redirect } from 'react-router-dom';
export default ({ component: C, appProps, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      !appProps
        ? <C {...props} {...appProps} />
        : <Redirect to="/" />}
  />;
