import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {z} from 'zod';
import {compSchema} from './env';
import {Title} from './HelloWorld/Title';

export const HelloWorld: React.FC<z.infer<typeof compSchema>> = ({
	titleText,
	titleColor,
}) => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const transitionStart = 20;

	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<Sequence style={{opacity}} from={transitionStart}>
				<Title titleText={titleText} titleColor={titleColor} />
			</Sequence>
		</AbsoluteFill>
	);
};
