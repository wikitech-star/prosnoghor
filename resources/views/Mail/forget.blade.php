<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>পাসওয়ার্ড পুনরুদ্ধার</title>
</head>

<body
    style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0"
        style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px;">
        <tr>
            <td style="background-color: #FCBF49; padding: 40px 30px; color: #000000; text-align: center;">
                <h2 style="margin: 0; font-size: 20px;">পাসওয়ার্ড রিসেট অনুরোধ</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px;">
                <p style="font-size: 16px; color: #333333;">প্রিয় {{ $data['name'] }} ব্যবহারকারী,</p>
                <p style="font-size: 15px; color: #555555;">
                    আপনি সম্প্রতি আপনার পাসওয়ার্ড রিসেট করার একটি অনুরোধ করেছেন। অনুগ্রহ করে নিচের বোতামে ক্লিক করে
                    নতুন পাসওয়ার্ড সেট করুন।
                </p>
                <p style="text-align: center; margin: 30px 0;">
                    <a href="{{ $data['resetUrl'] }}"
                        style="background-color: #FCBF49; color: #000000; padding: 12px 25px; text-decoration: none; font-size: 13px;">পাসওয়ার্ড
                        রিসেট করুন</a>
                </p>
                <p style="font-size: 15px; color: #555555;">
                    আপনি যদি পাসওয়ার্ড রিসেটের জন্য অনুরোধ না করে থাকেন, তাহলে অনুগ্রহ করে এই ইমেইলটি উপেক্ষা করুন।
                </p>
                <p style="font-size: 15px; color: #555555;">শুভেচ্ছান্তে,<br>{{config('app.name')}}</p>
            </td>
        </tr>
        <tr>
            <td
                style="background-color: #f4f4f4; padding: 15px 30px; text-align: center; font-size: 13px; color: #888888; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                © 2025 আপনার {{config('app.name')}} | এই বার্তাটি স্বয়ংক্রিয়ভাবে পাঠানো হয়েছে
            </td>
        </tr>
    </table>
</body>

</html>