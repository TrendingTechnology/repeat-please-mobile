import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { LinkButton } from 'repeat-please-styles';
import { LoginForm } from './components';
import { FORGOT_PASSWORD, SIGN_UP } from '../../navigator/routes';
import { NavigationStackProp } from 'react-navigation-stack';
import { AlertsContext } from '../../contexts/AlertsContext';
import { emailIsValid } from '../../utils/validations';
import { styles } from './style';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../actions/actionsCreator/signInActionsCreators';
import { AppState } from '../../reducers/rootReducer';
import { useTranslation } from 'react-i18next';

interface ISignInProps {
	navigation: NavigationStackProp;
}

export const SignIn = ({ navigation }: ISignInProps) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { isLoading, error } = useSelector((state: AppState) => state.signIn);
	const dispatch = useDispatch();
	const { showAlert } = useContext(AlertsContext);
	const { t } = useTranslation();

	const onEmailSubmit = (): boolean => {
		if (emailIsValid(email)) return true;
		showAlert({ type: 'error', message: 'Invalid Email' });
		return false;
	};

	const onSubmitPassword = async () => {
		dispatch(actions.signInRequest(email, password));
	};

	const onForgotPasswordPress = (): void => {
		navigation.navigate(FORGOT_PASSWORD, { email });
	};

	const onSignUpPress = (): void => {
		navigation.navigate(SIGN_UP);
	};

	if (error) {
		showAlert({ message: error, type: 'error' });
	}

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<LoginForm
					onEmailChange={emailText => setEmail(emailText)}
					onEmailSubmit={onEmailSubmit}
					onPassChange={passText => setPassword(passText)}
					onPassSubmit={onSubmitPassword}
					navigation={navigation}
					isLoading={isLoading}
				/>
				<LinkButton
					customStyle={styles.forgotPasswordStyle}
					onPress={onForgotPasswordPress}>
					{t('forgotPassword')}
				</LinkButton>
				<View style={styles.signUpContainer}>
					<TouchableOpacity onPress={onSignUpPress}>
						<Text style={[styles.signUpText, { color: '#000' }]}>
							{t('dontHaveAccount')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onSignUpPress}>
						<Text style={styles.signUpTextLink}>{t('signUpPlease')}</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};
