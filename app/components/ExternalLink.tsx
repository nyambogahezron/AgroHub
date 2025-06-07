import { openBrowserAsync } from 'expo-web-browser';
import { Platform, Pressable, Text } from 'react-native';

type Props = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

export function ExternalLink({ href, children, className }: Props) {
	if (Platform.OS === 'web') {
		return (
			<a
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className={className}
			>
				{children}
			</a>
		);
	}

	return (
		<Pressable onPress={() => openBrowserAsync(href)} className={className}>
			{children}
		</Pressable>
	);
}
