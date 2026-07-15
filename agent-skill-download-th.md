# วิธีโหลดไฟล์สกิล AstraLink ให้ Agent อ่าน

ไฟล์หลักที่ควรโยนให้ agent อ่านก่อนทำงานคือ:

```text
ASTRALINK_AGENT_START_HERE.md
```

ไฟล์เต็มสำหรับ agent ที่ต้องใช้ AstraLink บ่อยคือ:

```text
ASTRALINK_AGENT_SKILL.md
```

## ใช้เมื่อไหร่

ใช้ทุกครั้งที่ต้องการให้ agent ควบคุม AstraLink หรือทำงานผ่าน browser ของเรา เช่น:

- เปิดเว็บและอ่านข้อมูล
- กรอกฟอร์มทั่วไป
- ทำงานหลายแท็บ
- ใช้บัญชีที่คน login ไว้
- ทำงานเบื้องหลังโดยไม่แย่งเมาส์/คีย์บอร์ดของคน

## วิธีใช้แบบง่าย

1. ให้คนเปิด AstraLink
2. ให้ agent อ่าน `ASTRALINK_AGENT_START_HERE.md`
3. ถ้า agent ต้องทำงานจริงจัง ให้ agent อ่าน `ASTRALINK_AGENT_SKILL.md` เพิ่ม
4. agent ต้องเรียก snapshot ก่อนทำ action
5. agent ต้องขอ write lock ก่อนคลิก/พิมพ์/เปลี่ยนแท็บ
6. คนเป็นคนกรอก password, OTP, CAPTCHA, recovery code, card, CVV, PIN เองเท่านั้น

ถ้า Google แจ้งว่า browser ไม่ปลอดภัย ให้กดปุ่ม `Open secure browser` ใน AstraLink
หรือเปิดลิงก์นั้นใน Chrome/Edge แล้ว login เอง ห้ามให้ agent พยายามหลบหรือปลอม browser เพื่อข้ามระบบ Google

## ห้ามส่งไฟล์เหล่านี้ให้ใคร

ห้ามส่ง:

- `.runtime/`
- `control-token.txt`
- `agent-connection.json` จากเครื่องตัวเอง
- cookies/session/profile ของ browser
- screenshot ที่เห็นรหัส, OTP, token, ข้อมูลบัตร หรือข้อมูลส่วนตัว

ส่งได้:

- installer
- `ASTRALINK_AGENT_START_HERE.md`
- `ASTRALINK_AGENT_SKILL.md`
- `mcp-tools.md`
- `security.md`

## ลิงก์ดาวน์โหลด

เว็บไซต์:

```text
https://astralink-5oh.pages.dev/
```

GitHub Release:

```text
https://github.com/leesanfong/astralink/releases/tag/v0.1.0
```

## สรุปสำหรับคนไม่ใช่ programmer

โหลด AstraLink แล้วเปิดไว้

ถ้าจะให้ agent ใช้ AstraLink ให้ส่งไฟล์ `ASTRALINK_AGENT_START_HERE.md` ให้ agent อ่านก่อน

ถ้าเจอหน้ารหัสผ่านหรือ OTP ให้คนกรอกเองใน AstraLink แล้วบอก agent ว่า "เรียบร้อย ทำต่อได้"
