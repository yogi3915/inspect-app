import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from './config/index';
import {
  HomePage, RegisterPage, LoginPage, TaxCredibilityPage, CasesOptionPage,
  ReportFinish, AdminReport, AdminDetail
} from './pages';
import { Navbar } from './components';
import Footer from './components/Footer/index';
import MainReport from './pages/Report/MainReport';
// import store from './store';

function App() {
  return (
    <>
      <div className="App">
        <ApolloProvider client={client}>
          <Router>
            <Switch>
              <Route path="/report/:report">
                <Navbar />
                <MainReport/>
                <Footer/>
              </Route>
              <Route path="/report/:report">
                <Navbar />
                <MainReport/>
                <Footer/>
              </Route>
              <Route path="/admin/:reportId">
                <Navbar />
                <AdminDetail/>
                <Footer/>
              </Route>
              <Route path="/report-finish">
                <Navbar />
                <ReportFinish />
                <Footer/>
              </Route>
              {/* <Route path="/report/:report/3">
                <Navbar />
                <Report3 />
              </Route>
              <Route path="/report/:report">
                <Navbar />
                <Report1 />
              </Route> */}
              <Route path="/admin">
                <Navbar />
                <AdminReport />
                <Footer/>
              </Route>
              <Route path="/c">
                <Navbar />
                <CasesOptionPage />
                <Footer/>
              </Route>
              <Route path="/tax-and-credibility">
                <Navbar />
                <TaxCredibilityPage />
                <Footer/>
              </Route>
              <Route exact path="/">
                <Navbar/>
                <HomePage/>
                <Footer/>
              </Route>
              <Route path='/sign-in'>
                <LoginPage />
              </Route>
              <Route path='/sign-up'>
                <RegisterPage />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    </>
  );
}

export default App;
