import React from 'react';

const FileTest = () => (
<form action="/uploadTest" method="post" encType="multipart/form-data">
<div>
    <input multiple="multiple" type="file" name="multipartFileList"/>
</div>

<div>
    <button class="btn indigo waves-effect waves-light"
            type="submit" name="save">

        Submit<i class="mdi-content-send right"></i>
    </button>
</div>
</form>
);

export default FileTest;
