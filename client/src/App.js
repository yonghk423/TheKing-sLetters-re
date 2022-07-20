import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useUserState } from './context/UserContext';

/* Page */
import Header from './Menu/Header';
import Footer from './Menu/Footer';
import AdminHeader from './Menu/AdminHeader';
import AdminFooter from './Menu/AdminFooter';
import GoogleAuth from './Views/Pages/MyPage/GoogleAuth';
import GithubAuth from './Views/Pages/MyPage/GithubAuth';
import Loading from './Loading/Loading';

/* 페이지 로딩 테스트를 위한 임시 주석 처리 */
// import LandingPage from './Views/Pages/Landing/LandingPage';
// import QuizPost from './Views/Pages/QuizPost/QuizPost';
// import QuizSolve from './Views/Pages/QuizSolve/QuizSolve';
// import MileageShop from './Views/Pages/MileageShop/MileageShop';
// import Mypage from './Views/Pages/MyPage/MyPage';
// import Main from './Views/Pages/Main/Main';
// import Admin from './Views/Pages/Admin/AdminPage';
// import ProblemBox from './Views/Pages/ProblemBox/ProblemBox';

// modal
import HeaderFooterModalController from './Views/Modals/Controllers/HeaderFooterModalController';

function App() {
  /* 관리자 로그인 정보 확인 */
  const userState = useUserState();

  /* lazy loading 컴포넌트 */
  // 최소 로딩 시간 2초
  const LandingPage = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve(import('./Views/Pages/Landing/LandingPage')),
        3200
      );
    });
  });
  // 나머지는 최소 로딩 시간 없음
  const MileageShop = lazy(() =>
    import('./Views/Pages/MileageShop/MileageShop')
  );
  const QuizPost = lazy(() => import('./Views/Pages/QuizPost/QuizPost'));
  const QuizSolve = lazy(() => import('./Views/Pages/QuizSolve/QuizSolve'));
  const Mypage = lazy(() => import('./Views/Pages/MyPage/MyPage'));
  const Main = lazy(() => import('./Views/Pages/Main/Main'));
  const Admin = lazy(() => import('./Views/Pages/Admin/AdminPage'));
  const ProblemBox = lazy(() => import('./Views/Pages/ProblemBox/ProblemBox'));

  return (
    <>
      {userState.isAdminLoggedIn ? (
        <>
          <Suspense fallback={<Loading />}>
            <HeaderFooterModalController />
            <AdminHeader />
            <Route exact path="/" component={Admin}></Route>
            <Route path="/quizsolve/:id" component={QuizSolve}></Route>
            <AdminFooter />
          </Suspense>
        </>
      ) : (
        <>
          <Suspense fallback={<Loading />}>
            <HeaderFooterModalController />
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage}></Route>
              <Route exact path="/main" component={Main}></Route>
              <Route exact path="/mypage" component={Mypage}></Route>
              <Route exact path="/quizpost" component={QuizPost}></Route>
              <Route exact path="/mileageshop" component={MileageShop}></Route>
              <Route exact path="/mynote" component={ProblemBox}></Route>
              <Route exact path="/shop" component={MileageShop}></Route>
              <Route path="/quizsolve/:id" component={QuizSolve}></Route>
              <Route exact path="/auth/google" component={GoogleAuth}></Route>
              <Route exact path="/auth/git" component={GithubAuth}></Route>
            </Switch>
            <Footer />
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;
