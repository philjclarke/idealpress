<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'downview_wordpressec4');

/** MySQL database username */
define('DB_USER', 'downview_wordec4');

/** MySQL database password */
define('DB_PASSWORD', 'MgHneZCkw21l');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '_?O{rLNXwkHMDja>Nth<Ltt*wTjp+Oj=+](K/zrZDVCL_+SAi^^IqCUdTwmyVna?$|yiVLHTaiJSEmlqadCU?HWX];Pp(eT-hwRy-=eO%(wl>HjVs=pbwuZG{f;KJS@x');
define('SECURE_AUTH_KEY', 't-=){FkB^lC++weM?|MY_Ve-XO=&vZy>Z;mAMuSO+cu)+wxb|@*[Yv}pGyM}aYD!PSOGCd^c%|BOPicEj_+x*=J@^nvFP{EZrnV^ke|C}MPI&pkrTWpiB@p];IUOI{+N');
define('LOGGED_IN_KEY', 'P/[Kvk@X(+WB;|O[Iw=>Ai+CyF<@>OTCBQEl&dhoq;!<Q@$*n@l(np!nFoNG*ATbQK((Nu?oBjzu;gBsZopEC$ZfkJ=oG[x!mdrHIn!(]Az$T+bIA?L]-<pO/([)U;Nd');
define('NONCE_KEY', 'OZTmmsduY%IOp%EGYSX_YiP^?<!-Y+Bgf*=N?yfQ+-!;Waa_EQ/-SguYb^>bekmP*BSOQiu=]y*CYppp-u<g+qltJC[qO=a^dP)mTGeFj[c_pvMRd(rrx;^A}_kibV+}');
define('AUTH_SALT', 'u@e}bFm/v!TYX)WlViX$aHfV+dzDwK/(YKdku_-Iw@!p-E;mLVec]D[W(Fu;XqcLn[T|hXINM%wjN<%KXdUJ[mTFZffMO==Jt@k!L>XFqMjb}Usin]!I{*MTh;}q=ZAa');
define('SECURE_AUTH_SALT', 'm}Ee+GqI(uH|dmH>|v<CAn(_y*frStbb<ns%K<Jetn](wqsSfqbC<kMAH%Nqull<J+DXTkJ-tu<cdKYp|HNX{)jAM+=UbnOYpyR&fWe%i*c|Mq}|$|$u^|mZqHui)N?[');
define('LOGGED_IN_SALT', '%FVL)<qlEm^h=%hWSBI=(YdRGCqxA+iUITRB(OQIA;XHKhmbkLsE[vQd;!*&!cgKAg;^jbftJGHDh!c&{+E]ARd{otlj<&xosoJmmCL|J>^Pd>VZmQlPf]esQHHZajCE');
define('NONCE_SALT', 'x};K%EiwZ?=(s>U/D!@LY=;YTfy*>YVgfoc}[Q=P}WFdE%/vo(bS]oWff}bUr!|]v&CIVNRgcTjVMtjIEg]-ALC}h}gqmRqJP[w=WXJap{-Sdw)zQX$P;?{W}(=uNz]N');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_mriy_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
