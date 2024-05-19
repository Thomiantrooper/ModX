import emailjs from 'emailjs-com'
import icon from '../images/icon.jpg'

const EmployeeRegistrationForm = () => {
    function sendEmail(e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_1w89vwm",
            "template_r67a04b",
            e.target,
            "XjYUSQpJhGZvWiVZ3"
        ).then(res => {
            console.log(res);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <div style={{ position: 'absolute', width: '1488px', height: '750px', backgroundColor: 'rgb(244, 67, 67)' }} className='big'></div>
            <div style={{ position: 'absolute', width: '888px', height: '550px', marginLeft: '293px', marginTop: '140px', borderRadius: '20px', backgroundColor: 'rgb(211, 201, 201)' }} className='big1'></div>
            <div style={{ position: 'absolute', width: '630px', height: '400px', marginLeft: '420px', marginTop: '220px', borderRadius: '20px', backgroundColor: 'rgb(184, 184, 184)' }} className='box1'>
                <h1 style={{ position: 'absolute', marginLeft: '30px' }} className='register'>Register Profile</h1>
                <div style={{ position: 'absolute', marginLeft: '385px', marginTop: '60px', width: '210px', height: '275px', backgroundColor: 'rgb(255, 255, 255)' }} className='iconbox'>
                    <img style={{ position: 'absolute', marginTop: '9px', marginLeft: '-92px', width: '185px', height: '190px', borderRadius: '20px' }} className='Icon' src={icon} alt="Icon" />
                </div>
                <div style={{ marginRight: '619px', marginTop: '35px' }} className='form1'>
                    <form onSubmit={sendEmail}>
                        <label style={{ position: 'absolute', marginLeft: '60px', marginTop: '80px' }} className='name'>User name :-</label>
                        <input style={{ position: 'absolute', marginLeft: '150px', marginTop: '80px' }} className='nt' type='text' name='name' />

                        <label style={{ position: 'absolute', marginLeft: '60px', marginTop: '130px' }} className='email'>Email :-</label>
                        <input style={{ position: 'absolute', marginLeft: '150px', marginTop: '130px' }} className='et' type='email' name='user_email' />

                        <label style={{ position: 'absolute', marginLeft: '60px', marginTop: '180px' }} className='password'>Password :-</label>
                        <input style={{ position: 'absolute', marginLeft: '150px', marginTop: '180px' }} className='pw' name='message' rows='4' />

                        <input style={{ position: 'absolute', marginLeft: '209px', marginTop: '272px', backgroundColor: 'red', borderRadius: '4px', width: '110px', height: '28px', borderWidth: '0px' }} className='submit' type='submit' value='Create Account' />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmployeeRegistrationForm;
