'use server'

export default async function getData() {
    const data = {
        home: {
            title: "Reyhan Naufal Hayyan",
            subtitle: "Website Developer Enthusiast",
            description: "Possess a sharp eye for detail, thrive in collaborative environments, and eagerly embrace new technologies and methodologies.",
        },
        about: {
            description: "I am a final-year Computer Engineering student at the University of Brawijaya. I have a strong foundation in building web servers using Node.js and a solid understanding of HTML, CSS, and JavaScript.",
            interestedList: ["Internet of Things", "Cryptocurrencies", "Web Development"],
        },
        qualification: [
            {
                title: 'Education',
                icon: 'UilGraduationCap',
                data: [
                    { title: 'SMAN 1 Bekasi', href: 'https://www.sman1bekasi.sch.id/', subtitle: 'Senior High School', date: '2015 - 2018' },
                    { title: 'Universitas Brawijaya', href: 'https://ub.ac.id/', subtitle: 'Computer Engineering', date: '2018 - Present' },
                ],
            },
            {
                title: 'Certification',
                icon: 'UilAward',
                data: [
                    { title: 'Web Development (Node.js)', href: 'https://progate.com/path_certificate/de53efe9qep08a', subtitle: 'Progate', date: 'August 2020' },
                    { title: 'Building LINE Chatbot', href: 'https://www.dicoding.com/certificates/0LZ0D2E30X65', subtitle: 'Dicoding', date: 'January 2021' },
                    { title: 'Cloud Practitioner Essentials', href: 'https://www.dicoding.com/certificates/07Z6LDGE2PQR', subtitle: 'Dicoding', date: 'April 2021' },
                    { title: 'Building Cognitive Applications', href: 'https://www.dicoding.com/certificates/N9ZOD0GLDPG5', subtitle: 'Dicoding', date: 'April 2021' },
                    { title: 'Create Back-End Applications for Beginners', href: 'https://www.dicoding.com/certificates/MEPJKVQGLX3V', subtitle: 'Dicoding', date: 'November 2022' },
                    { title: 'Building REST APIs with Node.js', href: 'https://www.udemy.com/certificate/UC-61e07775-dd70-48c0-9084-cae99df74546/', subtitle: 'Udemy', date: 'March 2023' },
                ],
            },
        ],
        skills: [
            {
                no: 1,
                logo: '/logo/axios.png',
                logoDark: null,
                title: 'Axios',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 2,
                logo: '/logo/canva.png',
                logoDark: null,
                title: 'Canva',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 3,
                logo: '/logo/express.png',
                logoDark: '/logo/express-dark.png',
                title: 'Express',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 4,
                logo: '/logo/icons8.png',
                logoDark: null,
                title: 'Icons8',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 5,
                logo: '/logo/jquery.png',
                logoDark: null,
                title: 'Jquery',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 6,
                logo: '/logo/mongo.png',
                logoDark: null,
                title: 'MongoDB',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 7,
                logo: '/logo/mysql.png',
                logoDark: null,
                title: 'MySQL',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 8,
                logo: '/logo/postman.png',
                logoDark: null,
                title: 'Postman',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 9,
                logo: '/logo/axios.png',
                logoDark: null,
                title: 'Axios',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 10,
                logo: '/logo/canva.png',
                logoDark: null,
                title: 'Canva',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 11,
                logo: '/logo/express.png',
                logoDark: '/logo/express-dark.png',
                title: 'Express',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 12,
                logo: '/logo/icons8.png',
                logoDark: null,
                title: 'Icons8',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 13,
                logo: '/logo/jquery.png',
                logoDark: null,
                title: 'Jquery',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 14,
                logo: '/logo/mongo.png',
                logoDark: null,
                title: 'MongoDB',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 15,
                logo: '/logo/mysql.png',
                logoDark: null,
                title: 'MySQL',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
            {
                no: 16,
                logo: '/logo/postman.png',
                logoDark: null,
                title: 'Postman',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat sit amet nunc ac porttitor. Sed aliquet urna eget blandit.'
            },
        ],
        project: [
            {
                image: {
                    src: '/portfolio1.jpg',
                    alt: 'Portfolio Hayyan Pertama'
                },
                title: 'Portofolio 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula hendrerit libero. Fusce egestas tincidunt erat, nec luctus massa tempus vestibulum. Maecenas lacinia, tellus eu.',
                button: {
                    href: 'https://www.tiktok.com/',
                    newTab: true,
                    text: 'Explore'
                }
            },
            {
                image: {
                    src: '/portfolio2.jpg',
                    alt: 'Portfolio Hayyan Kedua'
                },
                title: 'Portofolio 2',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula hendrerit libero. Fusce egestas tincidunt erat, nec luctus massa tempus vestibulum. Maecenas lacinia, tellus eu.',
                button: {
                    href: 'https://www.tiktok.com/',
                    newTab: true,
                    text: 'Explore'
                }
            },
            {
                image: {
                    src: '/portfolio3.jpg',
                    alt: 'Portfolio Hayyan Ketiga'
                },
                title: 'Portofolio 3',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula hendrerit libero. Fusce egestas tincidunt erat, nec luctus massa tempus vestibulum. Maecenas lacinia, tellus eu.',
                button: {
                    href: 'https://www.tiktok.com/',
                    newTab: true,
                    text: 'Explore'
                }
            },
            {
                image: {
                    src: '/portfolio4.jpg',
                    alt: 'Portfolio Hayyan Keempat'
                },
                title: 'Portofolio 4',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula hendrerit libero. Fusce egestas tincidunt erat, nec luctus massa tempus vestibulum. Maecenas lacinia, tellus eu.',
                button: {
                    href: 'https://www.tiktok.com/',
                    newTab: true,
                    text: 'Explore'
                }
            },
        ],
        contact: {
            content: [
                {
                    uil: 'UilPhone',
                    title: 'Phone',
                    text: '+6281288772032',
                    className: 'contact__icon'
                },
                {
                    uil: 'UilEnvelope',
                    title: 'Email',
                    text: 'arirereoji@gmail.com',
                    className: 'contact__icon'
                },
                {
                    uil: 'UilLocationPoint',
                    title: 'Location',
                    text: 'Jakarta - Indonesia',
                    className: 'contact__icon'
                }
            ],
            button: {
                text: 'Submit'
            }
        }
    };

    return data;
}