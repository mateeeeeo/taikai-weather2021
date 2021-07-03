import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WeatherType } from './enums/enums';
import ForecastPreview from './ForecastPreview';

interface Forecast {
    temperature: number,
    date: Date,
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
        let day = 0;

        for (let i = 0; i < 7; i++) {
            const date: Date = new Date();
            date.setDate(date.getDate() + day);

            previews[i] = {
                temperature: 32,
                date,
                isHighFloodRisk: false,
                weatherType: WeatherType.sunny
            };
            day++;
        }
        setPreviews([...previews]);
    }, []);

    return (
        <PreviewsContainer>
            {previews.map((preview, i) =>
                <ForecastPreview
                    key={i}
                    date={preview.date}
                    temperature={preview.temperature}
                    isHighFloodRisk={preview.isHighFloodRisk}
                    weatherType={preview.weatherType}
                />
            )}
        </PreviewsContainer>
    );
}