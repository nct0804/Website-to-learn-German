import logo from '../../assets/logo.png';

export default function Logo() {
    return (
        <div className="flex items-center p-6">
            <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />
        </div>
    )
}