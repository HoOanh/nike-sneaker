-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 18, 2022 lúc 04:59 AM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `nike_sneaker`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `spam` int(11) NOT NULL DEFAULT 1 COMMENT '0 - ban\r\n1 - none',
  `address` text NOT NULL,
  `phone` varchar(11) NOT NULL,
  `rank` int(11) NOT NULL DEFAULT 0 COMMENT '0 - user\r\n1 - admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `email`, `spam`, `address`, `phone`, `rank`) VALUES
(30, 'Hồ Minh Oanh', '$2b$10$khAeuC.95bur43NYIuaDaOiSFbcVQmZxoQCvJNgN0q4/JTIXpNzAe', 'oanh@gmail.com', 1, '', '', 0),
(31, 'Đinh Hoàng Duy', '$2b$10$MTydRsiEk/9PxqcgdB4Isuyjcf.V8hDRV98bCRsoyP9xJPOMGAhAi', 'duy@gmail.com', 1, '', '', 0),
(32, 'Cao Quang Sang', '$2b$10$FkMinCFOCgSO30r5RkK63uVrCg42M/.oilBCn0BkSCBed/6iDLVIi', 'sang@gmail.com', 1, '', '', 0),
(33, 'Đào Hoàng Linh', '$2b$10$6zfcoYExiVRceTIIbgp5Zuj4vCTb3paMbLv3dRIonnZkJiIk4.vvW', 'linh@gmail.com', 1, '', '', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `images` varchar(255) NOT NULL,
  `cat_banner` varchar(255) NOT NULL,
  `highlight` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `banner`
--

INSERT INTO `banner` (`id`, `name`, `description`, `images`, `cat_banner`, `highlight`) VALUES
(1, '\"Hãy cho tôi điểm tựa, \r\ntôi sẽ nhất bổng quả đất lên\"', 'Nâng niu bàn chân Việt.               \nNike sneaker khuyến mãi siêu hot', 'images/banner/banner3.png', 'head', 1),
(2, 'Tỏa sáng cực ngầu', 'Logo phản quang, Miếng trang trí bảy sắc,Tấm lót gót chân bằng vật liệu 3M\n', 'images/banner/banner2.png', 'head', 1),
(3, 'Thiết Kế Tinh Tế & Hoàn Hảo Đến Từng Chi Tiết', 'Chừng Nào Đôi Chân Tôi Còn Bước Trên Mặt Đất – Tôi Sẽ Chỉ Đi Các Đôi Giày Chất Nhất !!! Bạn Đã Sắm Được Cho Mình Một Đôi Giày Đã Thực Sự Vừa Lòng Chưa ???', '../images/banner/banner1.png', 'head', 1),
(5, 'Giày cho cặp đôi', 'col-lg-8 col-md-8', 'images/category/c1.jpg', 'area', 1),
(6, 'Giày thể thao', 'col-lg-4 col-md-4', 'images/category/c3.jpg', 'area', 1),
(7, 'Giày phòng tập', 'col-lg-4 col-md-4', 'images/category/c2.jpg', 'area', 1),
(8, 'Giày bóng chuyền', 'col-lg-8 col-md-8', 'images/category/c4.jpg', 'area', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `cat_order` int(11) NOT NULL,
  `showHide` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0-hide; 1-show',
  `highlight` tinyint(1) DEFAULT 0 COMMENT '0-non highlight; 1-highlight'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `cat_name`, `slug`, `cat_order`, `showHide`, `highlight`) VALUES
(1, 'lifestyle', 'lifestyle-1', 1, 1, 0),
(2, 'jordan', 'jordan-2', 2, 1, 0),
(3, 'running', 'running-3', 3, 1, 0),
(4, 'basketball', 'basketball-4', 4, 1, 0),
(5, 'football', 'football-5', 5, 1, 0),
(6, 'tranning & gym', 'tranning-gym-6', 6, 1, 0),
(7, 'golf', 'golf-7', 7, 1, 0),
(8, 'skateboarding', 'skateboarding-8', 8, 1, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_addpress` varchar(255) NOT NULL,
  `account_email` varchar(255) NOT NULL,
  `account_phone` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '0 - xac nhan\r\n1 - chuan bi hang\r\n2- dang giao\r\n3- thanh cong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `account_name`, `account_addpress`, `account_email`, `account_phone`, `date`, `status`) VALUES
(1, 'test', 'test', 'test', 9128921, '2022-01-19 15:47:49', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `oder_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`oder_id`, `product_id`, `quantity`) VALUES
(0, 12, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `pro_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `time_up` timestamp NOT NULL DEFAULT current_timestamp(),
  `detail` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `image` varchar(255) NOT NULL,
  `sale` float NOT NULL DEFAULT 0 COMMENT '0-0% -> 1-100%',
  `highlight` tinyint(1) DEFAULT 0 COMMENT '0-non highlight; 1-highlight',
  `cate_slug` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `pro_name`, `slug`, `price`, `time_up`, `detail`, `views`, `image`, `sale`, `highlight`, `cate_slug`) VALUES
(1, 'Jordan Zoom Separate PF', 'jordan-zoom-separate-pf-1', 3239000, '2022-02-11 14:22:37', 'Cú sút lùi của Luka là nàng thơ cho Jordan Zoom Separate PF, một đôi giày đế thấp nhẹ được thiết kế để giúp bạn kiểm soát trên sân. nghiêng người trong khi xoay người và thay đổi hướng. Bộ phận Zoom Air cung cấp đệm đáp ứng khi bạn nhắm vào rổ. Phiên bản PF này sử dụng đế ngoài siêu bền, lý tưởng cho các sân ngoài trời.', 0, '../images/product/bk-1.jfif', 0.1, 1, 'basketball-4'),
(2, 'LeBron 19', 'lebron-19-2', 5869000, '2022-02-09 14:22:37', 'LeBron phát triển mạnh khi tiền đặt cọc cao và áp lực lớn. LeBron 19 khai thác năng lượng đó bằng một bộ quần áo có khóa và hệ thống đệm cập nhật. Các miếng đệm ở lưỡi gà và xung quanh cổ giày giúp giảm trọng lượng, giữ cho mắt cá chân thẳng hàng và mang lại cho người chơi cảm giác an toàn và tự tin thi đấu hết mình khi trận đấu đang diễn ra.', 0, '../images/product/bk-2.jfif', 0, 1, 'basketball-4'),
(5, 'Nike Air Max Impact 3', 'nike-air-max-impact-3-3', 2649000, '2022-02-06 14:22:37', 'Gây ảnh hưởng đến trận đấu ở cả hai đầu sân trong Nike Air Max Impact 3. Thử thách dành cho những người chơi tạo ra sự tách biệt với phương thẳng đứng của họ, nó có đệm Max Air đã được thử nghiệm áp lực để giúp hấp thụ lực va chạm. và sự ổn định.', 0, '../images/product/bk-3.jfif', 0.2, 1, 'basketball-4'),
(6, 'Giannis Immortality \"Force Field\"', 'giannis-immortality-gorce-field-6', 2349000, '2022-02-15 14:22:37', 'Giannis là một ngôi sao băng, một phạm vi ảnh hưởng với tầm ảnh hưởng lớn. Giống như một nam châm cực mạnh, anh ta thu hút những người bảo vệ và đẩy lùi họ một cách dễ dàng đáng kinh ngạc, giống như thần Zeus xóa sổ các tiểu hành tinh bằng các tia chớp. Phiên bản \"Force Field\" của Giannis Immortality có màu sắc vũ trụ lấy cảm hứng từ các thuộc tính ở thế giới khác của Giannis.', 0, '../images/product/bk-4.jfif', 0.15, 1, 'basketball-4'),
(7, 'LeBron Witness 6 EP', 'leBron-witness-6-ep-7', 2929000, '2022-02-02 14:22:37', 'Đối với lần lặp lại này của LeBron Witness, chúng tôi đã thay đổi Zoom Air để lấy đệm Max Air có thể nhìn thấy — yêu thích của LeBron — để giúp tiêu tán lực tác động và mang lại cảm giác nhạy bén. Lưới nhẹ, được gia cố giúp bạn luôn ở trong mọi tình huống, khỏi dây vải khai thác bàn chân trước của bạn đến các miếng đúc bên ngoài khóa gót chân của bạn.', 0, '../images/product/bk-5.jfif', 0, 1, 'lifestyle-1'),
(8, 'Kyrie Infinity EP', 'kyrie-infinity-ep-8', 3829000, '2022-02-13 14:22:37', 'Kyrie càng làm chậm càng nhanh thì anh ta có thể tăng tốc hoặc đổi hướng nhanh hơn. Khả năng kiểm soát chuyển động của anh ta khiến các hậu vệ luôn đoán được — và anh ta kiểm soát được. Kyrie Infinity EP cung cấp đệm, phù hợp tùy chỉnh và lực kéo lên hai bên, cho phép người chơi tăng tốc và giảm tốc theo yêu cầu và tận dụng sự tách biệt mà họ tạo ra.', 0, '../images/product/bk-6.jfif', 0, 0, 'lifestyle-1'),
(9, 'LeBron 19', 'leBron-19-9', 5869000, '2022-02-15 14:22:37', 'LeBron phát triển mạnh khi tiền cược cao và áp lực gia tăng. LeBron 19 khai thác năng lượng đó với một bộ đồ vừa vặn có khóa và hệ thống đệm được cập nhật. Ống tay áo bên trong vừa khít được kéo lại với nhau bằng một lớp phủ điêu khắc mà các dây buộc xuyên qua để giúp ngăn bàn chân di chuyển vào bên trong giày. Vỏ đệm xung quanh cổ áo và lưỡi gà tạo thêm sự thoải mái đồng thời giảm trọng lượng, mang lại cho người chơi cảm giác an toàn và tự tin chơi hết mình khi trận đấu đang diễn ra.', 0, '../images/product/bk-7.jfif', 0, 0, 'jordan-2'),
(10, 'KD14', 'kd14-10', 4699000, '2022-02-15 14:22:37', 'Kevin Durant ẩn nấp bên cánh, đợi thời điểm thích hợp để tấn công trước khi băng qua hàng rào chắn. KD14 được thiết kế để giúp những người chơi đa năng, không ngừng vận động như KD cảm thấy tươi mới trong suốt trận đấu. Các chuyển động bên trong giày. Đệm Zoom Air toàn chiều dài cộng với bọt Cushlon giúp cung cấp năng lượng trở lại để mang lại hiệu suất lâu dài.', 0, '../images/product/bk-8.jfif', 0, 0, 'jordan-2'),
(11, 'The Nike Premier 3 FG', 'the-nike-premier-3-fg-11', 3219000, '2022-02-15 14:22:37', 'Nike Premier 3 quay trở lại những điều cơ bản với hình bóng vượt thời gian được bọc trong da kangaroo dẻo dai — giúp bạn di chuyển tự tin như một sức mạnh không thể ngăn cản trên sân cỏ.', 0, '../images/product/fb-1.jfif', 0, 1, 'jordan-2'),
(12, 'Nike Phantom GT2 Elite FG', 'nike-phantom-gt2-elite-fg-12', 7909000, '2022-02-01 14:22:37', 'Tạo sóng xung kích trên sân với thiết kế cập nhật trông nhanh như khi bạn chơi. Flyknit phía trên có hoa văn kết cấu được thiết kế để giúp bạn đặt các bức ảnh của mình với độ chính xác chính xác.', 0, '../images/product/fb-2.jfif', 0, 0, 'running-3'),
(13, 'The Nike Premier 3 FG', 'the-nike-premier-3-fg-13', 3219000, '2022-02-15 14:22:37', 'Nike Premier 3 quay trở lại những điều cơ bản với hình bóng vượt thời gian được bọc trong da kangaroo dẻo dai — giúp bạn di chuyển tự tin như một sức mạnh không thể ngăn cản trên sân cỏ.', 0, '../images/product/fb-1.jfif', 0, 0, 'running-3'),
(14, 'Nike Phantom GT2 Elite FG', 'nike-phantom-gt2-elite-fg', 7909000, '2022-02-15 14:22:37', 'Tạo sóng xung kích trên sân với thiết kế cập nhật trông nhanh như khi bạn chơi. Flyknit phía trên có hoa văn kết cấu được thiết kế để giúp bạn đặt các bức ảnh của mình với độ chính xác chính xác.', 0, '../images/product/fb-2.jfif', 0, 0, 'running-3'),
(15, 'Nike Mercurial Vapor 14', 'nike-mercurial-vapor-14-15', 1509000, '2022-02-15 14:22:37', 'Nike Mercurial Vapor 14 Club TF có lưới co giãn trong suốt phần trên để tạo sự thoải mái nhẹ, trong khi đế cao su giúp siêu tích điện lực kéo trên sân cỏ.', 0, '../images/product/fb-3.jfif', 0, 0, 'running-3'),
(16, 'Nike Phantom GT2 Club Dynamic Fit MG', 'nike-phantom-gt2-glub-dynamic-fit-mg-16', 1889000, '2022-02-06 14:22:37', 'Xây dựng dựa trên Phantom GT, Nike Phantom GT2 Club Dynamic Fit MG có thiết kế cập nhật và kiểu dáng được thiết kế để giúp bạn thực hiện các cú đánh của mình với độ chính xác chính xác. độ chính xác.', 0, '../images/product/fb-5.jfif', 0, 0, 'tranning-gym-6'),
(17, 'Nike Mercurial Vapor 14 Academy IC', 'nike-mercurial-vapor-14-academy-ic-17', 2349000, '2022-02-15 14:22:37', 'The Nike Mercurial Vapor 14 Academy IC is a grippy design with multi-directional traction that helps set you up for super-charged speed.', 0, '../images/product/fb-4.jfif', 0, 1, 'tranning-gym-6'),
(18, 'Nike Mercurial Superfly 8 Club MG', 'nike-mercurial-superfly-8-club-mg-18', 1889000, '2022-02-12 14:22:37', '\nNike Mercurial Superfly 8 Club MG thiết lập cho bạn tốc độ với sự vừa vặn liền mạch. Kết cấu màu sắc rực rỡ ở phía trên giúp bạn kiểm soát chính xác, trong khi các đinh tán ở phía dưới cung cấp lực kéo để cắt nhanh và dừng đột ngột.', 0, '../images/product/fb-6.jfif', 0, 0, 'tranning-gym-6'),
(19, 'Nike Air Max 90 G NRG', 'nike-air-max-90-g-nrg-19', 4409000, '2022-02-15 14:22:37', 'Chúng có thể dễ dàng hòa trộn trong môi trường hoang dã, nhưng những đốm da báo trên Air Max 90 G NRG sẽ rất nổi bật. da.', 0, '../images/product/golf-1.jfif', 0, 1, 'tranning-gym-6'),
(20, 'Jordan Zoom Separate PF', 'jordan-zoom-separate-pf-20', 3239000, '2022-02-10 14:22:37', 'Cú sút lùi của Luka là nàng thơ cho Jordan Zoom Separate PF, một đôi giày đế thấp nhẹ được thiết kế để giúp bạn kiểm soát trên sân. nghiêng người trong khi xoay người và thay đổi hướng. Bộ phận Zoom Air cung cấp đệm đáp ứng khi bạn nhắm vào rổ. Phiên bản PF này sử dụng đế ngoài siêu bền, lý tưởng cho các sân ngoài trời.', 0, '../images/product/jd-1.jfif', 0, 0, 'golf-7'),
(21, 'Nike Air Force 1 \'07', 'nike-air-force-1-07-21', 2649000, '2022-02-10 14:22:37', 'Sự rạng rỡ tồn tại trong Nike Air Force 1 \'07, quả bóng b-ball OG mang đến một sự thay đổi mới mẻ về những gì bạn biết rõ nhất: các lớp phủ được khâu đẹp, kết thúc sạch sẽ và lượng đèn flash hoàn hảo để khiến bạn tỏa sáng.', 0, '../images/product/ls-1.jfif', 0, 0, 'skateboarding-8'),
(22, 'Nike Air Zoom Alphafly NEXT% Flyknit', 'nike-air-zoom-alphafly-next-flyknit-22', 8369000, '2022-02-10 14:22:37', 'Chuẩn bị cho những điều tốt nhất tiếp theo của bạn với Nike Air Zoom Alphafly NEXT% Flyknit. Nó mang lại cho bạn năng lượng hoàn trả lớn nhất trong tất cả các loại giày đua của chúng tôi với cảm giác đẩy cho đến vạch đích. Thiết kế nhẹ, thoáng khí và được hỗ trợ bởi dữ liệu để giúp bạn luôn thoải mái.', 0, '../images/product/rn-1.jfif', 0, 0, 'football-5'),
(23, 'Nike SB Ishod Wair', 'nike-sb-ishod-wair-23', 2929000, '2022-02-10 14:22:37', 'Khi đến lúc chế tạo chiếc giày đặc trưng của mình, Ishod Wair đã dốc toàn lực từ đầu đến cuối. tất cả độ bền bạn cần để trượt băng khó — nghiêm túc, hãy kiểm tra đế lót mới đó — Nike SB Ishod Wair đi bộ giữa phong cách nguyên bản và cải tiến giày trượt hiện đại.', 0, '../images/product/sb-1.jfif', 0.05, 0, 'basketball-4'),
(24, 'Nike Air Monarch IV', 'nike-air-monarch-iv-24', 1909000, '2022-02-02 14:22:37', 'Nike Air Monarch IV giúp bạn tập luyện với lớp da bền ở trên để hỗ trợ. Bọt nhẹ kết hợp với đệm Nike Air để tạo sự thoải mái trong mỗi sải chân.', 0, '../images/product/tn-gym-1.jfif', 0.23, 0, 'basketball-4');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT cho bảng `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
