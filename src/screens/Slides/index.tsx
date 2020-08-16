import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { HOME } from '../../navigator/routes';
import { NavigationStackProp } from 'react-navigation-stack';
import {
	Slide,
	SlideFooter,
	SlideLogo,
	SlideHeader,
	color,
} from 'repeat-please-styles';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/actionsCreator/profileActionsCreator';

export interface ISlidesProps {
	navigation: NavigationStackProp;
}

export const Slides = ({ navigation }: ISlidesProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const nextScreen = () => {
		dispatch(actions.setProfile({ id: 0, isFirstAccess: false }));
		navigation.navigate(HOME);
	};
	const duration = 800;
	const slidesContent = [
		{
			header: <SlideLogo greeting={t('greeting')} />,
			footer: <SlideFooter text={t('slide01')} />,
		},
		{
			header: <SlideHeader title={t('slide02Title')} />,
			footer: <SlideFooter text={t('slide02')} />,
		},
		{
			header: <SlideHeader title={t('slide03Title')} />,
			footer: <SlideFooter text={t('slide03')} />,
		},
	];

	return (
		<SafeAreaView style={styles.container} data-test="slidesComponent">
			<Slide
				{...{
					slides: slidesContent,
					nextScreen,
					duration,
					labels: {
						skipLabel: t('skipLabel'),
						nextLabel: t('nextLabel'),
						startLabel: t('startLabel'),
						backLabel: t('backLabel'),
					},
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.background,
	},
});
