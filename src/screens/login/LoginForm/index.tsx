import React from 'react';
import {
	ButtonRounded,
	Logo,
	MessageWarning,
	TitleLogo,
} from 'repeat-please-styles';
import { Email, Password, SocialMediaButtons } from '../../../components';
import { ScrollView, KeyboardAvoidingView, View } from 'react-native';
import { styles } from './styles';

export interface ILoginFormProps {
	hasError: boolean;
	errorMessage: string;
	email: string;
	onEmailChange: (email: string) => void;
	password: string;
	onPasswordChange: (password: string) => void;
	handleLogin: () => void;
	handleFacebookLogin: () => void;
	handleGoogleLogin: () => void;
	isLoading: boolean;
}

export const LoginForm = ({
	hasError,
	errorMessage,
	email,
	handleFacebookLogin,
	handleGoogleLogin,
	onEmailChange,
	password,
	onPasswordChange,
	handleLogin,
	isLoading,
}: ILoginFormProps): JSX.Element => (
	<KeyboardAvoidingView style={styles.wrapper} data-test="login">
		<ScrollView contentContainerStyle={styles.scrollStyle}>
			<View style={styles.container}>
				<Logo customStyle={styles.logoStyle} />
				<TitleLogo />
			</View>
			<View style={styles.container}>
				<Email email={email} onEmailChange={onEmailChange} />
				<Password
					password={password}
					onPasswordChange={onPasswordChange}
					onSubmited={handleLogin}
				/>
				{hasError && (
					<MessageWarning
						customStyle={styles.messageStyle}
						data-test="errorMessage">
						{errorMessage}
					</MessageWarning>
				)}
				<ButtonRounded
					onPress={handleLogin}
					isLoading={isLoading}
					customStyle={styles.loginButtonStyle}>
					Login
				</ButtonRounded>
			</View>
			<View style={styles.container}>
				<SocialMediaButtons
					customStyle={styles.buttonStyle}
					handleFacebookSubmit={handleFacebookLogin}
					handleGoogleSubmit={handleGoogleLogin}
				/>
			</View>
		</ScrollView>
	</KeyboardAvoidingView>
);