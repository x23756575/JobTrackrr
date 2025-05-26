import React from 'react';

export default function Terms() {
    return (
        <main style={styles.container}>
            <h1 style={styles.title}>Terms of Service</h1>
            <p style={styles.lastUpdated}>Last Updated: 26/5/2025</p>

            <p>
                Welcome to <strong>JobTrackr</strong> (“we,” “our,” or “us”). By using our website and services (“Service”), you agree to the following terms and conditions. Please read them carefully.
            </p>

            <section style={styles.section}>
                <h2 style={styles.heading}>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using our Service, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the Service.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>2. Description of Service</h2>
                <p>
                    <strong>JobTrackr</strong>is a platform that helps users organize and track their job applications,scan there resume for feedback, receive feedback from AI assistant using gemma3, rewrite the resume and access paid services to enhance their job search experience. We store limited personal information such as your email address and application data you submit. We do <strong>not</strong> store resumes or other documents unless explicitly stated.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>3. User Responsibilities</h2>
                <ul style={styles.list}>
                    <li>You are responsible for providing accurate information.</li>
                    <li>You agree not to misuse the Service or interfere with its operation.</li>
                    <li>You agree not to submit unlawful, harmful, or fraudulent content.</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>4. Payment and Refunds</h2>
                <ul style={styles.list}>
                    <li>Some features require payment.</li>
                    <li>All fees are listed clearly before purchase.</li>
                    <li>All paid features are listed under payment plans</li>
                    <li>Payments are processed through STRIPE.</li>
                    <li>Unless otherwise specified, payments are <strong>non-refundable</strong>.</li>
                    <li>If you believe you were charged incorrectly, please contact us at samore123ash@gmail.com</li>
                </ul>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>5. No Guarantee</h2>
                <p>We do not guarantee:</p>
                <ul style={styles.list}>
                    <li>That using the Service will lead to job offers or interviews.</li>
                    <li>The accuracy, completeness, or usefulness of any data or recommendations.</li>
                </ul>
                <p>The Service is provided “as is” without warranties of any kind.</p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>6. Privacy and Data Security</h2>
                <p>
                    Your personal data is handled according to our <a href="/privacy-policy" style={styles.link}>Privacy Policy</a>. We use reasonable measures to protect your data but cannot guarantee absolute security.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>7. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, <strong>JobTrackr</strong> and its affiliates are <strong>not liable</strong> for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
                </p>
                <p>
                    Our total liability to you for any claims related to the Service will not exceed the amount you have paid us in the last six months.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>8. Termination</h2>
                <p>
                    We may suspend or terminate your access to the Service at any time, without notice, for conduct that violates these Terms or is harmful to others.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>9. Changes to Terms</h2>
                <p>
                    We may update these Terms from time to time. We will notify you of significant changes via email or on the website. Continued use of the Service after changes constitutes acceptance of the new Terms.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>10. Governing Law and Dispute Resolution</h2>
                <p>
                    These Terms are governed by the laws of <strong>Ireland</strong>.
                </p>
                <p>
                    Any disputes arising from these Terms will be resolved through binding arbitration in <strong>Ireland</strong>, unless otherwise required by law.
                </p>
            </section>

            <section style={styles.section}>
                <h2 style={styles.heading}>11. Contact Us</h2>
                <p>If you have questions about these Terms, please contact us at:</p>
                <address style={styles.address}>
                    JobTrackr <br />
                    Email: <a href="mailto:samore123ash@gmail.com" style={styles.link}>samore123ash@gmail.com</a> <br />
                    Address: Ashbourne, Meath
                </address>
            </section>
        </main>
    );
}

const styles: {[key: string]: React.CSSProperties} = {
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
