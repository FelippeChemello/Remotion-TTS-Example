import {Composition} from 'remotion';
import {compSchema} from './types';
import {HelloWorld} from './HelloWorld';
import {audioAlreadyExists, textToSpeech} from './tts';

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
					voice: 'enUSWoman1' as const,
				}}
				calculateMetadata={async ({props}) => {
					if (
						!(await audioAlreadyExists({
							text: props.titleText,
							voice: props.voice,
						}))
					) {
						console.log('synthesizing audio', props.titleText);
						await textToSpeech(props.titleText, props.voice);
					}

					return {};
				}}
				schema={compSchema}
			/>
		</>
	);
};
