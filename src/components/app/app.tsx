import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import AppHeader from '../app-header/app-header';
import { MainPage } from '../../pages/main';
import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientDetailsPage } from '../../pages/ingredient-details';
import { getIngredientsData } from '../../services/actions/constructor';
import { Feed } from '../../pages/feed';
import { OrderDetailPage } from '../../pages/order-detail';
import { OrderCardDetail } from '../order-card-detail/order-card-detail';
import { WS_ENDPOINT_ALL, WS_ENDPOINT_POFILE_ORDERS } from '../../utils/web-socket';
import { useDispatch, useSelector } from '../../hooks/react-redux';
import { ILocationWithBackground } from '../../types/type'
import styles from './app.module.css'

const App: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationWithBackground>();
    const isLoading = useSelector(state => state.constructor.ingredientsRequest);
    const isError = useSelector(state => state.constructor.ingredientsRequestFailed);
    const background = location.state?.background;
    

    const handleCloseModal = (): void => {
        history.goBack();
    }

    useEffect((): void => {
        dispatch(getIngredientsData())
        history.replace({ state: null })
        console.log('ACtions test3');
        
    }, [dispatch, history]);

    if (isLoading) {
        return <p className={`text text_type_main-default mt-2`}>Идет загрузка данных</p>
    } else if (isError) {
        return <p className={`text text_type_main-default mt-2`}>Произошла ошибка</p>;
    }


    return (
        <div className={`${styles.pageContainer} pb-10`}>
            <AppHeader />
            <main className={styles.mainContent}>
                <Switch location={background || location}>
                    <Route path='/login' exact={true}>
                        <LoginPage />
                    </Route>

                    <Route path='/register' exact={true}>
                        <RegisterPage />
                    </Route>

                    <Route path='/forgot-password' exact={true}>
                        <ForgotPasswordPage />
                    </Route>

                    <Route path='/reset-password' exact={true}>
                        <ResetPasswordPage />
                    </Route>

                    <Route path='/' exact={true}>
                        <MainPage />
                    </Route>

                    <Route path="/ingredients/:id">
                        <IngredientDetailsPage />
                    </Route>

                    <Route path="/feed" exact={true}>
                        <Feed />
                    </Route>
                    <Route path="/feed/:id">
                        <OrderDetailPage wsConnectionEndpoint={WS_ENDPOINT_ALL}/>
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id">
                        <OrderDetailPage wsConnectionEndpoint={WS_ENDPOINT_POFILE_ORDERS}/>
                    </ProtectedRoute>
                    <ProtectedRoute path='/profile'>
                        <ProfilePage />
                    </ProtectedRoute>


                </Switch>

                {background && (
                    <Modal handleCloseModal={handleCloseModal}>
                        <Route path='/ingredients/:id' >
                            <IngredientDetails />
                        </Route>
                        <Route path="/feed/:id">
                            <OrderCardDetail />
                        </Route>
                        <Route path="/profile/orders/:id">
                            <OrderCardDetail />
                        </Route>
                    </Modal>

                )}


            </main>


        </div>
    )
}

export default App