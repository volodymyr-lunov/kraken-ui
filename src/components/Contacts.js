import React from 'react';

const Contacts = () => (
  <div>
    <h1>Contacts</h1>
    <ul>
      <li><a href="mailto:v.lynev@gmail.com">v.lynev@gmail.com</a></li>
      <li><a href="call:+380666886354">+380666886354</a></li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/8+Lupine,+Irvine,+CA+92604,+USA/@33.6948585,-117.7910428,18z/data=!3m1!4b1!4m5!3m4!1s0x80dcdc57330bdb6f:0x53804323b77380f8!8m2!3d33.6948585!4d-117.7899485">
          8 Lupine, Irvine, CA 92604, USA
        </a>
      </li>
    </ul>
  </div>
);

export default Contacts;