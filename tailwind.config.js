/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./presentational/**/*.{js,jsx,ts,tsx}",
        "./infrastructure/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {
                "card-heading": "14px",
            },
            colors: {
                additional1: [
                    "#FFF2FCFF",
                    "#E7B2DBFF",
                    "#D079BCFF",
                    "#B84A9FFF",
                    "#96307FFF",
                    "#510D42FF",
                    "#2F0425FF",
                ],
                additional2: [
                    "#F7F2FFFF",
                    "#D2BDF5FF",
                    "#B08CEAFF",
                    "#8F5EE0FF",
                    "#6B3DB6FF",
                    "#2F1061FF",
                    "#180537FF",
                ],
                additional3: [
                    "#F2F7FFFF",
                    "#B9D4FFFF",
                    "#81B1FFFF",
                    "#0F6AFFFF",
                    "#094FC2FF",
                    "#043586FF",
                    "#011D49FF",
                ],
                additional4: [
                    "#F2FFFEFF",
                    "#90E1DAFF",
                    "#40C4B8FF",
                    "#02A698FF",
                    "#01877CFF",
                    "#004044FF",
                    "#002B28FF",
                ],
                additional5: [
                    "#F2FDFFFF",
                    "#96E1EDFF",
                    "#45C6DAFF",
                    "#00ACC8FF",
                    "#008CA3FF",
                    "#004C58FF",
                    "#002B32FF",
                ],
                additional6: [
                    "#F2FFF2FF",
                    "#AEE3AEFF",
                    "#74C674FF",
                    "#44AA44FF",
                    "#2C8B2CFF",
                    "#0C4C0CFF",
                    "#042C04FF",
                ],
                additional7: [
                    "#FFF3F2FF",
                    "#FCBFBDFF",
                    "#F88C89FF",
                    "#F55B56FF",
                    "#C73C38FF",
                    "#6A120FFF",
                    "#3B0604FF",
                ],
                additional8: [
                    "#FFFDF2FF",
                    "#FCF5BDFF",
                    "#F8EB89FF",
                    "#FFE000FF",
                    "#C7B638FF",
                    "#6A5F0FFF",
                    "#3B3504FF",
                ],
                danger: [
                    "#FFF2F4FF",
                    "#FAB2BCFF",
                    "#F47586FF",
                    "#EA0220FF",
                    "#B30118FF",
                    "#7B0111FF",
                    "#440009FF",
                ],
                neutral: [
                    "#FFFFFFFF",
                    "#F5F5F7FF",
                    "#EDEDF0FF",
                    "#D9D9DBFF",
                    "#9E9EA1FF",
                    "#6A6C72FF",
                    "#53565DFF",
                    "#3A3D45FF",
                    "#212329FF",
                    "#0A0B0DFF",
                    "#000000FF",
                ],
                primary: [
                    "#F2FBFFFF",
                    "#9AD4F4FF",
                    "#4AB0E8FF",
                    "#008FDDFF",
                    "#0074B3FF",
                    "#003E60FF",
                    "#002336FF",
                ],
                success: [
                    "#F2FFF8FF",
                    "#A3E1BFFF",
                    "#60C38DFF",
                    "#058840FF",
                    "#036931FF",
                    "#014A22FF",
                    "#002C14FF",
                ],
                warning: [
                    "#FFF8F2FF",
                    "#FCD3B4FF",
                    "#FAAF77FF",
                    "#F46A00FF",
                    "#BA5100FF",
                    "#803800FF",
                    "#471F00FF",
                ],
            },
        },
    },
    plugins: [],
};
