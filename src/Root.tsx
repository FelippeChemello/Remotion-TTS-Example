import {Composition} from 'remotion';
import {compSchema} from './types';
import {HelloWorld} from './HelloWorld';
import {getAudioDurationInSeconds} from '@remotion/media-utils';
import {audioAlreadyExists, createS3Url, synthesizeSpeech} from './tts';
import {waitForNoInput} from './debounce';

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
				calculateMetadata={async ({props, abortSignal}) => {
					await waitForNoInput(abortSignal, 1000);
					const exists = await audioAlreadyExists({
						text: props.titleText,
						voice: props.voice,
					});
					if (!exists) {
						await synthesizeSpeech(props.titleText, props.voice);
					}

					const fileName = createS3Url({
						titleText: props.titleText,
						voice: props.voice,
					});

					const duration = await getAudioDurationInSeconds(fileName);

					return {props, durationInFrames: Math.ceil(duration * 30)};
				}}
				schema={compSchema}
			/>
		</>
	);
};
