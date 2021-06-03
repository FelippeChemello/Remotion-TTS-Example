import {useEffect, useState} from 'react';
import {
	Audio,
	continueRender,
	delayRender,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {textToSpeech} from '../TextToSpeech';

export const Title: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();
	const text = titleText.split(' ').map((t) => ` ${t} `);

	const [handle] = useState(() => delayRender());
	const [audioUrl, setAudioUrl] = useState('');

	const fetchTts = async () => {
		const fileName = await textToSpeech(titleText, 'enUSWoman1');

		setAudioUrl(fileName);

		continueRender(handle);
	};

	useEffect(() => {
		fetchTts();
	}, []);

	return (
		<>
			{audioUrl ? <Audio src={audioUrl} /> : <></>}
			<h1
				style={{
					fontFamily: 'SF Pro Text, Helvetica, Arial',
					fontWeight: 'bold',
					fontSize: 100,
					textAlign: 'center',
					position: 'absolute',
					bottom: 160,
					width: '100%',
				}}
			>
				{text.map((t, i) => {
					return (
						<span
							key={t}
							style={{
								color: titleColor,
								marginLeft: 10,
								marginRight: 10,
								transform: `scale(${spring({
									fps: videoConfig.fps,
									frame: frame - i * 5,
									config: {
										damping: 100,
										stiffness: 200,
										mass: 0.5,
									},
								})})`,
								display: 'inline-block',
							}}
						>
							{t}
						</span>
					);
				})}
			</h1>
		</>
	);
};
