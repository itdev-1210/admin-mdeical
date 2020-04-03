import { STATE_LOGIN, STATE_SIGNUP } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch,withRouter } from 'react-router-dom';
import './styles/reduction.scss';
import './styles/change.css';


const DashboardPage = React.lazy(() => import('pages/DashboardPage'));

const DoctorListPage= React.lazy(()=>import('pages/DoctorListPage'));
const PatientListPage= React.lazy(()=>import('pages/PatientListPage'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      redirect: false,
    };
  }

  componentDidMount() {
    
    document.title = 'TourmedAdmin';

    fetch(process.env.REACT_APP_BACKEND_API+'/checkToken',{
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if(responseJson.email&&responseJson.user_type=="admin")
      {
         
      }
      else
      {
        this.props.history.push('/login');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }




  render() {
    
    return (
        <GAListener>
          <Switch>
            <LayoutRoute
              
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <LayoutRoute
              exact
              path="/signup"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_SIGNUP} />
              )}
            />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/doctorList" component={DoctorListPage} />
                <Route exact path="/patientList" component={PatientListPage} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default withRouter(componentQueries(query)(App));
