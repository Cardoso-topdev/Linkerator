import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { Header, SearchBar, ResultBoard, ContentWrapper, Toaster } from './components';
import { store } from './store';

const App = () => {
    return (
        <Provider store={store}>
            <ToastProvider
                autoDismiss
                autoDismissTimeout={6000}
                placement="top-center"
            >
                <ContentWrapper>
                    <Toaster>
                        <Header />
                        <SearchBar />
                        <ResultBoard />
                    </Toaster>
                </ContentWrapper>
            </ToastProvider>
        </Provider>
    );
}

export default App;