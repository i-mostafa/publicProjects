const {
    exec
} = require("child_process");

const cmd = `netsh advfirewall set allprofiles firewallpolicy blockinbound,blockoutbound`
cmd = `netsh advfirewall firewall add rule name="s" dir=in action=allow profile=any program="C:\\Program Files\\nodejs\\node.exe"
& netsh advfirewall firewall add rule name = "s" dir = out action = allow profile = any program = "C:\\Program Files\\nodejs\\node.exe"
`

cmd = `NETSH advfirewall reset`

cmd ` netsh advfirewall firewall add rule name="s" dir=in action=allow profile=any program="C:\\Program Files\\nodejs\\node.exe"
& netsh advfirewall firewall add rule name = "s" dir = out action = allow profile = any program = "C:\\Program Files\\nodejs\\node.exe"
`

exec(cmd, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});