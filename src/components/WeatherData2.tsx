import { Severity } from './enums/enums';
import styled, { css } from 'styled-components';
import { Text } from '../styled_components/styledComponents';
import { CompassSharp, RainySharp, SunnySharp, Water } from 'react-ionicons';
import { useRef, useEffect } from 'react';
import { Sunny } from 'react-ionicons';

function getSeverityColor(severity: Severity): string {
    switch (severity) {
        case Severity.great:
            return '#33cd18';
        case Severity.good:
            return '#72CD18';
        case Severity.ok:
            return '#d6cc11';
        case Severity.severe:
            return '#e3815b';
        case Severity.verySevere:
            return '#F16060';
    }
}

interface CircularDisplayProps {
    valueName: string,
    value: string,
    severity: Severity
}

function PressureDisplay(props: CircularDisplayProps) {
    const MAX_PRESSURE: number = 1100;
    const MIN_PRESSURE: number = 800;

    const Meter = useRef<SVGPathElement>(null);
    const Pressure = useRef<SVGPathElement>(null);

    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);

        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(" ");

        return d;
    }

    useEffect(() => {
        Pressure.current?.setAttribute("d", describeArc(169, 154, 120, -90, 0));
        Meter.current?.setAttribute("d", describeArc(169, 154, 120, 0, 90));
    }, []);

    const Container = styled.div`
        position: relative;
    `;

    const DisplayContainer = styled.svg`
        overflow: hidden;
    `;

    const Value = styled.path`
        transform-origin: center bottom;
        transform-box: fill-box;
        transform: rotate(-90deg);
    `;

    const PressureText = styled(Text)`
        text-align: center;
        margin-bottom: 1rem;
        font-size: 20px;
    `;

    const ValueText = styled(Text)`
        position: absolute;
        bottom: 16px;
        left: 0; 
        right: 0; 
        margin-left: auto; 
        margin-right: auto; 
        font-size: 24px;
        text-align: center;
        font-weight: bold;
    `;

    return (
        <Container>
            <PressureText>Air Pressure</PressureText>
            <DisplayContainer width="256" height="123" viewBox="0 0 348 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* <path d="M41 154C41 137.191 44.3108 120.546 50.7434 105.017C57.176 89.4868 66.6044 75.3762 78.4904 63.4903C90.3763 51.6044 104.487 42.176 120.017 35.7434C135.546 29.3108 152.191 26 169 26C185.809 26 202.454 29.3108 217.984 35.7434C233.513 42.1761 247.624 51.6045 259.51 63.4904C271.396 75.3763 280.824 89.4869 287.257 105.017C293.689 120.546 297 137.191 297 154H277.8C277.8 139.712 274.986 125.564 269.518 112.364C264.05 99.1639 256.036 87.1698 245.933 77.0668C235.83 66.9638 223.836 58.9496 210.636 53.4819C197.436 48.0142 183.288 45.2 169 45.2C154.712 45.2 140.564 48.0142 127.364 53.4819C114.164 58.9496 102.17 66.9637 92.0668 77.0668C81.9638 87.1698 73.9496 99.1638 68.4819 112.364C63.0142 125.564 60.2 139.712 60.2 154H41Z" fill="#D8D8D8" />
                <path d="M41 154C41 137.191 44.3108 120.546 50.7434 105.017C57.176 89.4868 66.6044 75.3762 78.4904 63.4903C90.3763 51.6044 104.487 42.176 120.017 35.7434C135.546 29.3108 152.191 26 169 26C185.809 26 202.454 29.3108 217.984 35.7434C233.513 42.1761 247.624 51.6045 259.51 63.4904C271.396 75.3763 280.824 89.4869 287.257 105.017C293.689 120.546 297 137.191 297 154L277.8 154C277.8 139.712 274.986 125.564 269.518 112.364C264.05 99.1639 256.036 87.1698 245.933 77.0668C235.83 66.9638 223.836 58.9496 210.636 53.4819C197.436 48.0142 183.288 45.2 169 45.2C154.712 45.2 140.564 48.0142 127.364 53.4819C114.164 58.9496 102.17 66.9637 92.0668 77.0668C81.9638 87.1698 73.9496 99.1638 68.4819 112.364C63.0142 125.564 60.2 139.712 60.2 154L41 154Z" fill="#4C65E9" /> */}
                <path ref={Pressure} fill="none" stroke="#4C65E9" stroke-width="16" />
                <path ref={Meter} fill="none" stroke="#D8D8D8" stroke-width="16" />
                <path d="M313.407 160H311.772V149.163L308.494 150.367V148.891L313.152 147.142H313.407V160ZM323.515 160H321.88V149.163L318.602 150.367V148.891L323.26 147.142H323.515V160ZM336.303 154.542C336.303 156.446 335.978 157.861 335.327 158.787C334.677 159.713 333.66 160.176 332.277 160.176C330.912 160.176 329.901 159.725 329.245 158.822C328.589 157.914 328.249 156.561 328.226 154.762V152.591C328.226 150.71 328.551 149.312 329.201 148.398C329.852 147.484 330.871 147.027 332.26 147.027C333.637 147.027 334.65 147.47 335.301 148.354C335.951 149.233 336.285 150.593 336.303 152.433V154.542ZM334.677 152.318C334.677 150.941 334.483 149.939 334.097 149.312C333.71 148.68 333.098 148.363 332.26 148.363C331.428 148.363 330.821 148.677 330.44 149.304C330.06 149.931 329.863 150.895 329.852 152.195V154.797C329.852 156.18 330.051 157.202 330.449 157.864C330.854 158.521 331.463 158.849 332.277 158.849C333.08 158.849 333.675 158.538 334.062 157.917C334.454 157.296 334.659 156.317 334.677 154.981V152.318ZM346.41 154.542C346.41 156.446 346.085 157.861 345.435 158.787C344.784 159.713 343.768 160.176 342.385 160.176C341.02 160.176 340.009 159.725 339.353 158.822C338.696 157.914 338.356 156.561 338.333 154.762V152.591C338.333 150.71 338.658 149.312 339.309 148.398C339.959 147.484 340.979 147.027 342.367 147.027C343.744 147.027 344.758 147.47 345.408 148.354C346.059 149.233 346.393 150.593 346.41 152.433V154.542ZM344.784 152.318C344.784 150.941 344.591 149.939 344.204 149.312C343.817 148.68 343.205 148.363 342.367 148.363C341.535 148.363 340.929 148.677 340.548 149.304C340.167 149.931 339.971 150.895 339.959 152.195V154.797C339.959 156.18 340.158 157.202 340.557 157.864C340.961 158.521 341.57 158.849 342.385 158.849C343.188 158.849 343.782 158.538 344.169 157.917C344.562 157.296 344.767 156.317 344.784 154.981V152.318Z" fill="white" />
                <path d="M268.407 54H266.772V43.1631L263.494 44.3672V42.8906L268.152 41.1416H268.407V54ZM281.195 48.542C281.195 50.4463 280.87 51.8613 280.22 52.7871C279.569 53.7129 278.553 54.1758 277.17 54.1758C275.805 54.1758 274.794 53.7246 274.138 52.8223C273.481 51.9141 273.142 50.5605 273.118 48.7617V46.5908C273.118 44.71 273.443 43.3125 274.094 42.3984C274.744 41.4844 275.764 41.0273 277.152 41.0273C278.529 41.0273 279.543 41.4697 280.193 42.3545C280.844 43.2334 281.178 44.5928 281.195 46.4326V48.542ZM279.569 46.3184C279.569 44.9414 279.376 43.9395 278.989 43.3125C278.603 42.6797 277.99 42.3633 277.152 42.3633C276.32 42.3633 275.714 42.6768 275.333 43.3037C274.952 43.9307 274.756 44.8945 274.744 46.1953V48.7969C274.744 50.1797 274.943 51.2021 275.342 51.8643C275.746 52.5205 276.355 52.8486 277.17 52.8486C277.973 52.8486 278.567 52.5381 278.954 51.917C279.347 51.2959 279.552 50.3174 279.569 48.9814V46.3184ZM284.025 47.584L284.676 41.2031H291.232V42.7061H286.056L285.669 46.1953C286.296 45.8262 287.008 45.6416 287.805 45.6416C288.971 45.6416 289.896 46.0283 290.582 46.8018C291.268 47.5693 291.61 48.6094 291.61 49.9219C291.61 51.2402 291.253 52.2803 290.538 53.042C289.829 53.7979 288.836 54.1758 287.559 54.1758C286.428 54.1758 285.505 53.8623 284.79 53.2354C284.075 52.6084 283.668 51.7412 283.568 50.6338H285.106C285.206 51.3662 285.467 51.9199 285.889 52.2949C286.311 52.6641 286.867 52.8486 287.559 52.8486C288.314 52.8486 288.906 52.5908 289.334 52.0752C289.768 51.5596 289.984 50.8477 289.984 49.9395C289.984 49.084 289.75 48.3984 289.281 47.8828C288.818 47.3613 288.2 47.1006 287.427 47.1006C286.718 47.1006 286.161 47.2559 285.757 47.5664L285.326 47.918L284.025 47.584ZM301.41 48.542C301.41 50.4463 301.085 51.8613 300.435 52.7871C299.784 53.7129 298.768 54.1758 297.385 54.1758C296.02 54.1758 295.009 53.7246 294.353 52.8223C293.696 51.9141 293.356 50.5605 293.333 48.7617V46.5908C293.333 44.71 293.658 43.3125 294.309 42.3984C294.959 41.4844 295.979 41.0273 297.367 41.0273C298.744 41.0273 299.758 41.4697 300.408 42.3545C301.059 43.2334 301.393 44.5928 301.41 46.4326V48.542ZM299.784 46.3184C299.784 44.9414 299.591 43.9395 299.204 43.3125C298.817 42.6797 298.205 42.3633 297.367 42.3633C296.535 42.3633 295.929 42.6768 295.548 43.3037C295.167 43.9307 294.971 44.8945 294.959 46.1953V48.7969C294.959 50.1797 295.158 51.2021 295.557 51.8643C295.961 52.5205 296.57 52.8486 297.385 52.8486C298.188 52.8486 298.782 52.5381 299.169 51.917C299.562 51.2959 299.767 50.3174 299.784 48.9814V46.3184Z" fill="white" />
                <path d="M155.407 13H153.772V2.16309L150.494 3.36719V1.89062L155.152 0.141602H155.407V13ZM168.195 7.54199C168.195 9.44629 167.87 10.8613 167.22 11.7871C166.569 12.7129 165.553 13.1758 164.17 13.1758C162.805 13.1758 161.794 12.7246 161.138 11.8223C160.481 10.9141 160.142 9.56055 160.118 7.76172V5.59082C160.118 3.70996 160.443 2.3125 161.094 1.39844C161.744 0.484375 162.764 0.0273438 164.152 0.0273438C165.529 0.0273438 166.543 0.469727 167.193 1.35449C167.844 2.2334 168.178 3.59277 168.195 5.43262V7.54199ZM166.569 5.31836C166.569 3.94141 166.376 2.93945 165.989 2.3125C165.603 1.67969 164.99 1.36328 164.152 1.36328C163.32 1.36328 162.714 1.67676 162.333 2.30371C161.952 2.93066 161.756 3.89453 161.744 5.19531V7.79688C161.744 9.17969 161.943 10.2021 162.342 10.8643C162.746 11.5205 163.355 11.8486 164.17 11.8486C164.973 11.8486 165.567 11.5381 165.954 10.917C166.347 10.2959 166.552 9.31738 166.569 7.98145V5.31836ZM178.303 7.54199C178.303 9.44629 177.978 10.8613 177.327 11.7871C176.677 12.7129 175.66 13.1758 174.277 13.1758C172.912 13.1758 171.901 12.7246 171.245 11.8223C170.589 10.9141 170.249 9.56055 170.226 7.76172V5.59082C170.226 3.70996 170.551 2.3125 171.201 1.39844C171.852 0.484375 172.871 0.0273438 174.26 0.0273438C175.637 0.0273438 176.65 0.469727 177.301 1.35449C177.951 2.2334 178.285 3.59277 178.303 5.43262V7.54199ZM176.677 5.31836C176.677 3.94141 176.483 2.93945 176.097 2.3125C175.71 1.67969 175.098 1.36328 174.26 1.36328C173.428 1.36328 172.821 1.67676 172.44 2.30371C172.06 2.93066 171.863 3.89453 171.852 5.19531V7.79688C171.852 9.17969 172.051 10.2021 172.449 10.8643C172.854 11.5205 173.463 11.8486 174.277 11.8486C175.08 11.8486 175.675 11.5381 176.062 10.917C176.454 10.2959 176.659 9.31738 176.677 7.98145V5.31836ZM188.41 7.54199C188.41 9.44629 188.085 10.8613 187.435 11.7871C186.784 12.7129 185.768 13.1758 184.385 13.1758C183.02 13.1758 182.009 12.7246 181.353 11.8223C180.696 10.9141 180.356 9.56055 180.333 7.76172V5.59082C180.333 3.70996 180.658 2.3125 181.309 1.39844C181.959 0.484375 182.979 0.0273438 184.367 0.0273438C185.744 0.0273438 186.758 0.469727 187.408 1.35449C188.059 2.2334 188.393 3.59277 188.41 5.43262V7.54199ZM186.784 5.31836C186.784 3.94141 186.591 2.93945 186.204 2.3125C185.817 1.67969 185.205 1.36328 184.367 1.36328C183.535 1.36328 182.929 1.67676 182.548 2.30371C182.167 2.93066 181.971 3.89453 181.959 5.19531V7.79688C181.959 9.17969 182.158 10.2021 182.557 10.8643C182.961 11.5205 183.57 11.8486 184.385 11.8486C185.188 11.8486 185.782 11.5381 186.169 10.917C186.562 10.2959 186.767 9.31738 186.784 7.98145V5.31836Z" fill="white" />
                <path d="M48.2949 48.375C47.9551 48.7793 47.5479 49.1045 47.0732 49.3506C46.6045 49.5967 46.0889 49.7197 45.5264 49.7197C44.7881 49.7197 44.1436 49.5381 43.5928 49.1748C43.0479 48.8115 42.626 48.3018 42.3271 47.6455C42.0283 46.9834 41.8789 46.2539 41.8789 45.457C41.8789 44.6016 42.04 43.8311 42.3623 43.1455C42.6904 42.46 43.1533 41.9355 43.751 41.5723C44.3486 41.209 45.0459 41.0273 45.8428 41.0273C47.1084 41.0273 48.1045 41.502 48.8311 42.4512C49.5635 43.3945 49.9297 44.6836 49.9297 46.3184V46.793C49.9297 49.2832 49.4375 51.1025 48.4531 52.251C47.4688 53.3936 45.9834 53.9795 43.9971 54.0088H43.6807V52.6377H44.0234C45.3652 52.6143 46.3965 52.2656 47.1172 51.5918C47.8379 50.9121 48.2305 49.8398 48.2949 48.375ZM45.79 48.375C46.335 48.375 46.8359 48.208 47.293 47.874C47.7559 47.54 48.0928 47.127 48.3037 46.6348V45.9844C48.3037 44.918 48.0723 44.0508 47.6094 43.3828C47.1465 42.7148 46.5605 42.3809 45.8516 42.3809C45.1367 42.3809 44.5625 42.6562 44.1289 43.207C43.6953 43.752 43.4785 44.4727 43.4785 45.3691C43.4785 46.2422 43.6865 46.9629 44.1025 47.5312C44.5244 48.0938 45.0869 48.375 45.79 48.375ZM52.918 47.584L53.5684 41.2031H60.125V42.7061H54.9482L54.5615 46.1953C55.1885 45.8262 55.9004 45.6416 56.6973 45.6416C57.8633 45.6416 58.7891 46.0283 59.4746 46.8018C60.1602 47.5693 60.5029 48.6094 60.5029 49.9219C60.5029 51.2402 60.1455 52.2803 59.4307 53.042C58.7217 53.7979 57.7285 54.1758 56.4512 54.1758C55.3203 54.1758 54.3975 53.8623 53.6826 53.2354C52.9678 52.6084 52.5605 51.7412 52.4609 50.6338H53.999C54.0986 51.3662 54.3594 51.9199 54.7812 52.2949C55.2031 52.6641 55.7598 52.8486 56.4512 52.8486C57.207 52.8486 57.7988 52.5908 58.2266 52.0752C58.6602 51.5596 58.877 50.8477 58.877 49.9395C58.877 49.084 58.6426 48.3984 58.1738 47.8828C57.7109 47.3613 57.0928 47.1006 56.3193 47.1006C55.6104 47.1006 55.0537 47.2559 54.6494 47.5664L54.2188 47.918L52.918 47.584ZM70.3027 48.542C70.3027 50.4463 69.9775 51.8613 69.3271 52.7871C68.6768 53.7129 67.6602 54.1758 66.2773 54.1758C64.9121 54.1758 63.9014 53.7246 63.2451 52.8223C62.5889 51.9141 62.249 50.5605 62.2256 48.7617V46.5908C62.2256 44.71 62.5508 43.3125 63.2012 42.3984C63.8516 41.4844 64.8711 41.0273 66.2598 41.0273C67.6367 41.0273 68.6504 41.4697 69.3008 42.3545C69.9512 43.2334 70.2852 44.5928 70.3027 46.4326V48.542ZM68.6768 46.3184C68.6768 44.9414 68.4834 43.9395 68.0967 43.3125C67.71 42.6797 67.0977 42.3633 66.2598 42.3633C65.4277 42.3633 64.8213 42.6768 64.4404 43.3037C64.0596 43.9307 63.8633 44.8945 63.8516 46.1953V48.7969C63.8516 50.1797 64.0508 51.2021 64.4492 51.8643C64.8535 52.5205 65.4629 52.8486 66.2773 52.8486C67.0801 52.8486 67.6748 52.5381 68.0615 51.917C68.4541 51.2959 68.6592 50.3174 68.6768 48.9814V46.3184Z" fill="white" />
                <path d="M7.29492 155.375C6.95508 155.779 6.54785 156.104 6.07324 156.351C5.60449 156.597 5.08887 156.72 4.52637 156.72C3.78809 156.72 3.14355 156.538 2.59277 156.175C2.04785 155.812 1.62598 155.302 1.32715 154.646C1.02832 153.983 0.878906 153.254 0.878906 152.457C0.878906 151.602 1.04004 150.831 1.3623 150.146C1.69043 149.46 2.15332 148.936 2.75098 148.572C3.34863 148.209 4.0459 148.027 4.84277 148.027C6.1084 148.027 7.10449 148.502 7.83105 149.451C8.56348 150.395 8.92969 151.684 8.92969 153.318V153.793C8.92969 156.283 8.4375 158.103 7.45312 159.251C6.46875 160.394 4.9834 160.979 2.99707 161.009H2.68066V159.638H3.02344C4.36523 159.614 5.39648 159.266 6.11719 158.592C6.83789 157.912 7.23047 156.84 7.29492 155.375ZM4.79004 155.375C5.33496 155.375 5.83594 155.208 6.29297 154.874C6.75586 154.54 7.09277 154.127 7.30371 153.635V152.984C7.30371 151.918 7.07227 151.051 6.60938 150.383C6.14648 149.715 5.56055 149.381 4.85156 149.381C4.13672 149.381 3.5625 149.656 3.12891 150.207C2.69531 150.752 2.47852 151.473 2.47852 152.369C2.47852 153.242 2.68652 153.963 3.10254 154.531C3.52441 155.094 4.08691 155.375 4.79004 155.375ZM19.1953 155.542C19.1953 157.446 18.8701 158.861 18.2197 159.787C17.5693 160.713 16.5527 161.176 15.1699 161.176C13.8047 161.176 12.7939 160.725 12.1377 159.822C11.4814 158.914 11.1416 157.561 11.1182 155.762V153.591C11.1182 151.71 11.4434 150.312 12.0938 149.398C12.7441 148.484 13.7637 148.027 15.1523 148.027C16.5293 148.027 17.543 148.47 18.1934 149.354C18.8438 150.233 19.1777 151.593 19.1953 153.433V155.542ZM17.5693 153.318C17.5693 151.941 17.376 150.939 16.9893 150.312C16.6025 149.68 15.9902 149.363 15.1523 149.363C14.3203 149.363 13.7139 149.677 13.333 150.304C12.9521 150.931 12.7559 151.895 12.7441 153.195V155.797C12.7441 157.18 12.9434 158.202 13.3418 158.864C13.7461 159.521 14.3555 159.849 15.1699 159.849C15.9727 159.849 16.5674 159.538 16.9541 158.917C17.3467 158.296 17.5518 157.317 17.5693 155.981V153.318ZM29.3027 155.542C29.3027 157.446 28.9775 158.861 28.3271 159.787C27.6768 160.713 26.6602 161.176 25.2773 161.176C23.9121 161.176 22.9014 160.725 22.2451 159.822C21.5889 158.914 21.249 157.561 21.2256 155.762V153.591C21.2256 151.71 21.5508 150.312 22.2012 149.398C22.8516 148.484 23.8711 148.027 25.2598 148.027C26.6367 148.027 27.6504 148.47 28.3008 149.354C28.9512 150.233 29.2852 151.593 29.3027 153.433V155.542ZM27.6768 153.318C27.6768 151.941 27.4834 150.939 27.0967 150.312C26.71 149.68 26.0977 149.363 25.2598 149.363C24.4277 149.363 23.8213 149.677 23.4404 150.304C23.0596 150.931 22.8633 151.895 22.8516 153.195V155.797C22.8516 157.18 23.0508 158.202 23.4492 158.864C23.8535 159.521 24.4629 159.849 25.2773 159.849C26.0801 159.849 26.6748 159.538 27.0615 158.917C27.4541 158.296 27.6592 157.317 27.6768 155.981V153.318Z" fill="white" />
            </DisplayContainer>
            <ValueText>1000.1mb</ValueText>
        </Container>
    );

}

interface HumidityDisplayProps {
    humidity: number
}

function HumidityDisplay(props: HumidityDisplayProps) {
    const HumidityDisplayContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        align-self: center;
    `;

    const HumidityContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const HumidityText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const HumidityIcon = styled(Water)`
        width: 32px;
        height: 32px;
        margin-right: 4px;
    `;

    const HumidityValue = styled(Text)`
        font-size: 32px;
        font-weight: bold;
    `;

    return (
        <HumidityDisplayContainer>
            <HumidityText as="p">Humidity</HumidityText>
            <HumidityContainer>
                <HumidityIcon width='32px' height='32px' color='white' />
                <HumidityValue>{props.humidity}%</HumidityValue>
            </HumidityContainer>
        </HumidityDisplayContainer>
    );
}

enum WindDirection {
    'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'
}

interface WindDisplayProps {
    speed: number,
    direction: WindDirection,
}

function WindDisplay(props: WindDisplayProps) {
    const WindDisplayContainer = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `;

    const WindText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const WindIcon = styled.i`
        font-size: 32px;
        color: white;
    `;

    const ArrowIcon = styled(WindIcon)`
        font-size: 24px;
        padding: 0 8px;
    `;

    const CompassIcon = styled(CompassSharp)`
        width: 32px;
        height: 32px;
        margin-right: 4px;
    `;

    const WindValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const WindValue = styled(Text)`
        font-size: 32px;
    `;

    return (
        <WindDisplayContainer>
            <WindText>Wind</WindText>
            <WindValueContainer>
                <WindIcon className="ri-windy-line" />
                <WindValue>
                    <b>{props.speed}m/s</b>
                    <ArrowIcon className="ri-arrow-right-line" />
                </WindValue>
                <CompassIcon width="32px" height="32px" color="white" />
                <WindValue><b>{WindDirection[props.direction]}</b></WindValue>
            </WindValueContainer>
        </WindDisplayContainer>
    );
}

interface RainChanceDisplayProps {
    chance: number
}

function RainChanceDisplay(props: RainChanceDisplayProps) {
    const RainDisplayContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    `;

    const RainText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const RainIcon = styled(RainySharp)`
        width: 32px;
        height: 32px;
        margin-right: 8px;
    `;

    const RainValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const RainValue = styled(Text)`
        font-size: 32px;
        font-weight: bold;
    `;

    return (
        <RainDisplayContainer>
            <RainText>Chance of rain</RainText>
            <RainValueContainer>
                <RainIcon width="32px" height="32px" color="white" />
                <RainValue>{props.chance}%</RainValue>
            </RainValueContainer>
        </RainDisplayContainer>
    );
}

enum WeatherCondition {
    Sunny, Clear, PartlyCloudy, Cloudy, Foggy,
}

interface WeatherConditionDisplayProps {
    condition: WeatherCondition
}

function WeatherConditionDisplay(props: WeatherConditionDisplayProps) {
    const WeatherConditionContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const WeatherConditionText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const WeatherConditionValue = styled(Text)`
        font-size: 32px;
        font-weight: bold;
    `;

    let conditionIconClass: string;
    const ConditionIcon = styled.i`
        font-size: 32px;
        color: white;
        margin-right: 8px;
    `;

    const ConditionValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    switch (props.condition) {
        case WeatherCondition.Sunny:
            conditionIconClass = 'ri-sun-fill';
            break;

        case WeatherCondition.PartlyCloudy:
            conditionIconClass = 'ri-sun-cloudy-fill';
            break;

        case WeatherCondition.Cloudy:
            conditionIconClass = 'ri-cloudy-fill';
            break;

        case WeatherCondition.Foggy:
            conditionIconClass = 'ri-foggy-fill';
            break;

        case WeatherCondition.Clear:
            conditionIconClass = 'ri-sun-foggy-fill';
            break;
    }

    return (
        <WeatherConditionContainer>
            <WeatherConditionText>Weather Condition</WeatherConditionText>
            <ConditionValueContainer>
                <ConditionIcon className={conditionIconClass} />
                <WeatherConditionValue>{WeatherCondition[props.condition]}</WeatherConditionValue>
            </ConditionValueContainer>
        </WeatherConditionContainer>

    );
}

interface SoilMoistureDisplayProps {
    moisture: number
}

function SoilMoistureDisplay(props: SoilMoistureDisplayProps) {
    const SoilMoistureContainer = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `;

    const SoilMoistureText = styled(Text)`
        font-size: 20px;
        margin-bottom: 0.25rem;
    `;

    const SoilMoistureValueContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const SoilMoistureValue = styled(Text)`
        font-size: 32px;
        font-weight: bold;
    `;

    const SoilMoistureIcon = styled.i`
        font-size: 32px;
        color: white;
        margin-right: 8px;
    `;

    return (
        <SoilMoistureContainer>
            <SoilMoistureText>Soil moisture</SoilMoistureText>
            <SoilMoistureValueContainer>
                <SoilMoistureIcon className="ri-flood-fill" />
                <SoilMoistureValue>{props.moisture}m</SoilMoistureValue>
            </SoilMoistureValueContainer>
        </SoilMoistureContainer>
    );
}

export default function WeatherData2() {
    const Grid = styled.div`
        margin-top: 1rem;
        display: grid;
        column-gap: 2.5rem;
        row-gap: 4rem;
        grid-template-columns: 1fr;
        align-items: center;
        justify-items: center;

        @media(min-width: 600px) {
            grid-template-columns: 1fr 1fr 1fr;
        }

        @media(min-width: 1200px) {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    `;

    const LocationText = styled(Text)`
        text-decoration: underline;
        margin: 0.5rem 1rem;
    `;

    return (
        <>
            <LocationText as="h1">Accra, GH</LocationText>
            <Grid>
                <PressureDisplay
                    valueName={'Pressure'}
                    value={'1000mb'}
                    severity={Severity.good}
                />
                <HumidityDisplay humidity={77} />
                <RainChanceDisplay chance={20} />
                <WindDisplay
                    speed={15}
                    direction={WindDirection.SW} />
                <WeatherConditionDisplay condition={WeatherCondition.Foggy} />
                <SoilMoistureDisplay moisture={0.033} />
            </Grid>
        </>
    );
}