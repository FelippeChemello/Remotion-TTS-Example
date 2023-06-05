import {Composition} from 'remotion';
import {compSchema} from './env';
import {HelloWorld} from './HelloWorld';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Working with TTS (Azure + AWS S3)',
					titleColor: 'black',
				}}
				schema={compSchema}
			/>
		</>
	);
};
