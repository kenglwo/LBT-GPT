import React from 'react';

const CopyrightHeader = () => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px 12px', borderRadius: '7px', width: '220px' }}>
      <div style={{ width: '88px', float: 'left' }}>
        <a href="https://www.ck12.org/" target="_blank">
          <img src="https://www.ck12.org/media/common/images/logo_ck12.svg" style={{ width: '100%' }} alt="CK-12 Foundation" />
        </a>
      </div>
      <div style={{ overflow: 'hidden', fontFamily: 'arial', fontSize: '10px', fontWeight: 'bold', color: '#72767f', paddingLeft: '15px', marginTop: '-7px' }}>
        LICENSED UNDER
        <div>
          <a href="https://www.ck12info.org/curriculum-materials-license/" target="_new">
            <img style={{ border: 'none', verticalAlign: 'middle', width: '100%' }} title="CK-12 Foundation is licensed under CK-12 Curriculum Materials License" alt="CK-12 Foundation is licensed under CK-12 Curriculum Materials License" src="https://www.ck12.org/media/images/ck12-license.svg" width="80" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CopyrightHeader;
