'use server'

import { allSectionDataSchema } from '@/schema/page/root';
import handleClientError from '@/utils/handleClientError';

/** @type {import('@/schema/page/root').allSectionDataType} */
const default_data = {
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
            logo: '/logo/reactjs.png',
            logoDark: null,
            tags: ['Library', 'Frontend'],
            url: 'https://react.dev/',
            title: 'React',
            description: 'Create interactive UIs with a component-based approach and declarative coding'
        },
        {
            no: 2,
            logo: '/logo/nextjs.png',
            logoDark: null,
            tags: ['Framework', 'Frontend', 'Backend'],
            url: 'https://nextjs.org/',
            title: 'Next.js',
            description: 'Build lightning-fast web apps with the power of React and server-side rendering.'
        },
        {
            no: 3,
            logo: '/logo/express.png',
            logoDark: '/logo/express-dark.png',
            tags: ['Framework', 'Backend'],
            url: 'https://expressjs.com/',
            title: 'Express',
            description: 'Simplify backend development with this lightweight and flexible Node.js framework.'
        },
        {
            no: 4,
            logo: '/logo/mysql.png',
            logoDark: null,
            tags: ['Database'],
            url: 'https://www.mysql.com/',
            title: 'MySQL',
            description: 'Reliable relational database for structured data and optimized queries.'
        },
        {
            no: 5,
            logo: '/logo/postgresql.png',
            logoDark: null,
            tags: ['Database'],
            url: 'https://www.postgresql.org/',
            title: 'PostgreSQL',
            description: 'Advanced open-source database with strong performance and scalability.'
        },
        {
            no: 6,
            logo: '/logo/supabase.png',
            logoDark: null,
            tags: ['Database', 'Backend'],
            url: 'https://supabase.com/',
            title: 'Supabase',
            description: 'Instant backend with real-time database and authentication capabilities.'
        },
        {
            no: 7,
            logo: '/logo/postman.png',
            logoDark: null,
            tags: ['Tool', 'API Testing'],
            url: '',
            title: 'Postman',
            description: 'API testing made simple with an intuitive interface and robust features.'
        },
        {
            no: 8,
            logo: '/logo/swagger.png',
            logoDark: null,
            tags: ['Tool', 'API Documentation'],
            url: 'https://www.postman.com/',
            title: 'Swagger',
            description: 'Design, document, and explore APIs with this powerful toolset.'
        },
        {
            no: 9,
            logo: '/logo/swr.png',
            logoDark: null,
            tags: ['Utility', 'Data Fetching'],
            url: 'https://swr.vercel.app/',
            title: 'swr',
            description: 'React hooks for data fetching with caching and revalidation built-in.'
        },
        {
            no: 10,
            logo: '/logo/motion.png',
            logoDark: null,
            tags: ['UI/UX', 'Animation'],
            url: 'https://motion.dev/',
            title: 'Motion',
            description: 'Add stunning animations and transitions with ease in React.'
        },
        {
            no: 11,
            logo: '/logo/ahooks.png',
            logoDark: null,
            tags: ['Utility', 'React Hooks'],
            url: 'https://ahooks.js.org/',
            title: 'ahooks',
            description: 'Advanced React hooks to supercharge your development workflow.'
        },
        {
            no: 12,
            logo: '/logo/swiper.png',
            logoDark: '/logo/express-dark.png',
            tags: ['UI/UX', 'Carousel'],
            url: 'https://swiperjs.com/',
            title: 'Swiper',
            description: 'Build sleek and responsive carousels for a dynamic user experience.'
        },
        {
            no: 13,
            logo: '/logo/recharts.png',
            logoDark: null,
            tags: ['Visualization', 'Charts'],
            url: 'https://recharts.org/',
            title: 'Recharts',
            description: 'Beautiful and customizable charts for your data visualization needs.'
        },
        {
            no: 14,
            logo: '/logo/joi.png',
            logoDark: null,
            tags: ['Validation'],
            url: 'https://joi.dev/',
            title: 'Joi',
            description: 'Elegant schema validator for server-side data processing.'
        },
        {
            no: 15,
            logo: '/logo/zod.png',
            logoDark: null,
            tags: ['Validation'],
            url: 'https://zod.dev/',
            title: 'Zod',
            description: 'Type-safe schema validation for JavaScript and TypeScript.'
        },
        {
            no: 16,
            logo: '/logo/hcaptcha.png',
            logoDark: null,
            tags: ['Security', 'Bot Protection'],
            url: 'https://www.hcaptcha.com/',
            title: 'Hcaptcha',
            description: 'Protect app from bots with a privacy-focused CAPTCHA solution.'
        },
        {
            no: 17,
            logo: '/logo/cypress.jpg',
            logoDark: null,
            tags: ['Testing'],
            url: 'https://www.cypress.io/',
            title: 'Cypress',
            description: 'End-to-end testing made reliable, fast, and developer-friendly.'
        },
        {
            no: 18,
            logo: '/logo/bugsnag.png',
            logoDark: null,
            tags: ['Monitoring', 'Error Tracking'],
            url: 'https://www.bugsnag.com/',
            title: 'Bugsnag',
            description: 'Error monitoring to detect and fix bugs with real-time insights.'
        },
        {
            no: 19,
            logo: '/logo/sentry.png',
            logoDark: null,
            tags: ['Monitoring', 'Performance'],
            url: 'https://sentry.io/',
            title: 'Sentry',
            description: 'Comprehensive performance and error tracking for better app stability.'
        },
        {
            no: 20,
            logo: '/logo/vercel.png',
            logoDark: null,
            tags: ['Hosting', 'Deployment'],
            url: 'https://vercel.com/',
            title: 'Vercel',
            description: 'The best platform for Next.js apps with seamless deployment and performance optimization.'
        },
        {
            no: 21,
            logo: '/logo/heroku.jpg',
            logoDark: null,
            tags: ['Hosting', 'Deployment'],
            url: 'https://www.heroku.com/',
            title: 'Heroku',
            description: 'Deploy apps quickly with managed hosting and a user-friendly interface.'
        },
    ],
    project: [
        {
            image: {
                src: '/sipk_mockup_full.png',
                alt: 'SIPK Mockup',
            },
            title: 'SIPK App',
            description: 'SIPK is an innovative web application designed to assist university students planning their academic journeys. It allows users to dynamically add, modify, or remove courses, forecast their GPA, and strategize their academic progress.',
            button: {
                href: 'https://www.sipk.app/',
                newTab: true,
                text: 'Discover More'
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
                text: 'rheyhannh@gmail.com',
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

export default async function getData() {
    try {
        const url = `${process.env.JSONBIN_API_URL}/b/${process.env.JSONBIN_ROOT_PAGE_DATA_BIN_ID}`;

        const response = await fetch(url, {
            headers: {
                'X-Master-Key': process.env.JSONBIN_MASTER_KEY || '',
                'X-Bin-Meta': 'false',
            },
            next: {
                revalidate: parseInt(process.env.ROOT_PAGE_DATA_REVALIDATE || "3600", 10),
                tags: ['root_page_data'],
            },
        });

        if (!response.ok) {
            console.warn(`Root page data fetch failed with status : ${response.status}`);
            return default_data;
        }

        const data = await response.json();

        try {
            return allSectionDataSchema.parse(data);
        } catch (schemaError) {
            handleClientError('Root page data validation error', schemaError);
            return default_data;
        }
    } catch (error) {
        handleClientError('Error fetching root page data', error);
        return default_data;
    }
}