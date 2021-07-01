import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import ForecastPreview from './ForecastPreview';

interface Forecast {
    temperature: number,
    time: number,
    isHighFloodRisk: boolean,
    weatherType: WeatherType
}

const PreviewsContainer = styled.div`
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: auto;
    margin-bottom: 16px;
`;

export default function ForecastPreviews() {

    const [previews, setPreviews] = useState<Forecast[]>([]);

    useEffect(() => {
        for (let i = 0; i < 24; i++) {
            // TODO: fetch from backend
            previews[i] = { temperature: 32, time: i, isHighFloodRisk: false, weatherType: WeatherType.sunny };
        }
        setPreviews([...previews]);
    }, []);

    return (
        <PreviewsContainer>
            {previews.map((preview, i) =>
                <ForecastPreview
                    key={i}
                    time={preview.time}
                    temperature={preview.temperature}
                    isHighFloodRisk={preview.isHighFloodRisk}
                    weatherType={preview.weatherType}
                />
            )}
        </PreviewsContainer>
    );
}