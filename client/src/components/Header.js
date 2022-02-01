import React from 'react';
import Button from './Button';
import {SiBetfair} from 'react-icons/si';

function Header() {
  return (
    <div className="p-5">
      <Button text='Primary' type='primary' icon={<SiBetfair />} onClick={null}/>
      <br></br>
      <Button text='Secondary' type='secondary'  onClick={null}/>
      <br></br>
      <Button text='Tertiary' type='tertiary' onClick={null}/>

    </div>
  );
}

export default Header;
