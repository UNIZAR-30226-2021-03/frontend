npm install --save react-copy-to-clipboard

import { BsClipboardData } from "react-icons/bs";
import CopyToClipboard from 'react-copy-to-clipboard'

<Grid item xs={1}>
    <CopyToClipboard text={password}>
        <Button
            variant="contained"
            size="large">
            <BsClipboardData />
        </Button>
    </CopyToClipboard>
</Grid>