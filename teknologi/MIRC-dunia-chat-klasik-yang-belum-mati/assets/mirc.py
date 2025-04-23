import socket
import threading

# Fungsi untuk kirim pesan ke server
def send_msg(sock, msg):
    sock.send((msg + "\r\n").encode())

# Fungsi untuk terima dan tampilkan pesan dari server
def receive(sock):
    while True:
        try:
            response = sock.recv(4096).decode()
            if not response:
                break
            print(response.strip())
        except:
            break

# input  login 
server = input("Masukkan alamat server IRC (contoh: irc.dal.net): ")
port = int(input("Masukkan port 6667: "))
channel = input("Masukkan nama channel (contoh: #jakarta): ")
nickname = input("Masukkan nickname : ")

# membuat koneksi ke IRC server
irc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
irc.connect((server, port))
print("> Terhubung ke server!")

# Kirim info identifikasi
send_msg(irc, f"NICK {nickname}")
send_msg(irc, f"USER {nickname} 0 * :{nickname}")

# Bergabung  ke channel
send_msg(irc, f"JOIN {channel}")
print(f"> Bergabung dengan channel: {channel}")

# menjalankan thread terpisah untuk menerima pesan dari server
threading.Thread(target=receive, args=(irc,), daemon=True).start()

# Loop kirim pesan dari terminal
while True:
    msg = input()
    if msg.lower() == "/quit":
        send_msg(irc, f"PART {channel} :Sampai jumpa!")
        send_msg(irc, "QUIT :Keluar dari IRC")
        irc.close()
        print("> Keluar dari channel dan memutus koneksi.")
        break
    elif msg:
        send_msg(irc, f"PRIVMSG {channel} :{msg}")
