import React, { useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
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
import styles from './app.module.css'

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const isLoading = useSelector(state => state.constructor.ingredientsRequest);
    const isError = useSelector(state => state.constructor.ingredientsRequestFailed);
    const background = location.state?.background;

    const handleCloseModal = () => {
        history.goBack();
    }

    useEffect(() => {
        dispatch(getIngredientsData())
        history.replace({ state: null })
    }, []);

    if (isLoading) {
        return <div>Идет загрузка данных</div>
    } else if (isError) {
        return <div>Произошла ошибка</div>;
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

                    <ProtectedRoute path='/profile'>
                        <ProfilePage />
                    </ProtectedRoute>

                    <Route path='/' exact={true}>
                        <MainPage />
                    </Route>

                    <Route path="/ingredients/:id" component={IngredientDetailsPage} />


                </Switch>

                {background && (
                    <Route path='/ingredients/:id' >
                        <Modal handleCloseModal={handleCloseModal}>
                            <IngredientDetails />
                        </Modal>
                    </Route>
                )}


            </main>


        </div>
    )
}

export default App