import React from 'react';

export default function PrivacyPolicy() {
    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Privacy Policy</h1>
            <p style={styles.lastUpdated}>Last Updated: 26/5/25</p>

            <p>
                <strong>JobTrackr</strong> (“we,” “our,” or “us”) values your privacy. This Privacy Policy explains how we collect,
                use, and protect your personal information when you use our Service.
            </p>

            <section style={styles.section}>
                <h2 style={styles.heading}>1. Information We Collect</h2>
                <p>We collect limited personal information including:</p>
                <ul style={styles.list}>
                    <li>Email address</li>
                    <li>Job application data you submit</li>
                </ul>
                <p>We do <strong>not</strong> store resumes or other uploaded documents unless explicitly stated.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>2. How We Use Your Information</h2>
                <p>We use your information to:</p>
                <ul style={styles.list}>
                    <li>Provide and improve our Service</li>
                    <li>Send you important updates and communications</li>
                    <li>Process payments if applicable</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>3. Data Security</h2>
                <p>
                    We implement reasonable security measures to protect your personal data, but no method of transmission over
                    the Internet or electronic storage is completely secure.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>4. Sharing Your Information</h2>
                <p>We do not sell your personal data. We may share information with trusted third parties only as necessary to provide the Service (e.g., payment processors).</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>5. Your Choices</h2>
                <p>You can update or delete your account information by contacting us. You may opt-out of marketing emails at any time.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>6. Changes to This Policy</h2>
                <p>We may update this Privacy Policy occasionally. We will notify you of significant changes through our website or email.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>7. Contact Us</h2>
                <p>If you have any questions or concerns about your privacy, please contact us at:</p>
                <address style={styles.address}>
                    JobTrackr <br />
                    Email: <a href="mailto:samore123ash@gmail.com" style={styles.link}>samore123ash@gmail.com</a> <br />
                    Address: Ashbourne, Meath
                </address>
            </section>
        </main>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: 720,
        margin: '2rem auto',
        padding: '0 1rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: 1.6,
        color: '#333',
    },
    title: {
        fontSize: '2.25rem',
        fontWeight: '700',
        marginBottom: '0.5rem',
        textAlign: 'center',
    },
    lastUpdated: {
        fontSize: '0.9rem',
        color: '#666',
        textAlign: 'center',
        marginBottom: '2rem',
    },
    section: {
        marginBottom: '1.75rem',
    },
    heading: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        borderBottom: '2px solid #ddd',
        paddingBottom: '0.25rem',
    },
    list: {
        paddingLeft: '1.25rem',
        marginTop: 0,
    },
    link: {
        color: '#0070f3',
        textDecoration: 'none',
    },
    address: {
        fontStyle: 'normal',
        lineHeight: 1.4,
    },
};
