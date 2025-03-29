import LoginForm from "../../components/LoginForm/LoginForm"

const LoginPage: React.FC = () => {
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100vw',
                position: 'relative',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                    filter: 'grayscale(60%)',
                    backgroundColor: '#6e1490',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            />
            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flex: 1, height: '100%' }}>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage