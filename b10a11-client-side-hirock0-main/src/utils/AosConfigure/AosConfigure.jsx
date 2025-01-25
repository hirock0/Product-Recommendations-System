
import AOS from 'aos';
import 'aos/dist/aos.css';

export const AOSConfigure = () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        anchorPlacement: 'top-bottom',
        offset: 120,
    });
    return null;
}
