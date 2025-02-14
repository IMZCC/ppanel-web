declare namespace API {
  type AlipayF2FConfig = {
    app_id: string;
    private_key: string;
    public_key: string;
    invoice_name: string;
    sandbox: boolean;
  };

  type Announcement = {
    id: number;
    title: string;
    content: string;
    show: boolean;
    pinned: boolean;
    popup: boolean;
    created_at: number;
    updated_at: number;
  };

  type Application = {
    id: number;
    icon: string;
    name: string;
    description: string;
    subscribe_type: string;
  };

  type ApplicationConfig = {
    app_id: number;
    encryption_key: string;
    encryption_method: string;
    domains: string[];
    startup_picture: string;
    startup_picture_skip_time: number;
  };

  type ApplicationPlatform = {
    ios?: ApplicationVersion[];
    mac?: ApplicationVersion[];
    linux?: ApplicationVersion[];
    android?: ApplicationVersion[];
    windows?: ApplicationVersion[];
    harmony?: ApplicationVersion[];
  };

  type ApplicationResponse = {
    applications: ApplicationResponseInfo[];
  };

  type ApplicationResponseInfo = {
    id: number;
    name: string;
    icon: string;
    description: string;
    subscribe_type: string;
    platform: ApplicationPlatform;
  };

  type ApplicationVersion = {
    id: number;
    url: string;
    version: string;
    description: string;
    is_default: boolean;
  };

  type AuthConfig = {
    mobile: MobileAuthenticateConfig;
    email: EmailAuthticateConfig;
    register: RegisterConfig;
  };

  type AuthMethodConfig = {
    id: number;
    method: string;
    config: Record<string, any>;
    enabled: boolean;
  };

  type BatchDeleteCouponRequest = {
    ids: number[];
  };

  type BatchDeleteDocumentRequest = {
    ids: number[];
  };

  type BatchDeleteNodeGroupRequest = {
    ids: number[];
  };

  type BatchDeleteNodeRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeGroupRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeRequest = {
    ids: number[];
  };

  type BatchDeleteUserRequest = {
    ids: number[];
  };

  type Coupon = {
    id: number;
    name: string;
    code: string;
    count: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit: number;
    subscribe: number[];
    used_count: number;
    enable: boolean;
    created_at: number;
    updated_at: number;
  };

  type CreateAnnouncementRequest = {
    title: string;
    content: string;
  };

  type CreateApplicationRequest = {
    icon: string;
    name: string;
    description: string;
    subscribe_type: string;
    platform: ApplicationPlatform;
  };

  type CreateApplicationVersionRequest = {
    url: string;
    version: string;
    description: string;
    platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'harmony';
    is_default: boolean;
    application_id: number;
  };

  type CreateCouponRequest = {
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type CreateDocumentRequest = {
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type CreateNodeGroupRequest = {
    name: string;
    description: string;
  };

  type CreateNodeRequest = {
    name: string;
    tags: string[];
    country: string;
    city: string;
    server_addr: string;
    relay_mode: string;
    relay_node: NodeRelay[];
    speed_limit: number;
    traffic_ratio: number;
    group_id: number;
    protocol: string;
    config: Record<string, any>;
    enable: boolean;
    sort: number;
  };

  type CreateOrderRequest = {
    user_id: number;
    type: number;
    quantity?: number;
    price: number;
    amount: number;
    discount?: number;
    coupon?: string;
    coupon_discount?: number;
    commission: number;
    fee_amount: number;
    method?: string;
    trade_no?: string;
    status?: number;
    subscribe_id?: number;
  };

  type CreateRuleGroupRequest = {
    name: string;
    icon: string;
    description: string;
    enable: boolean;
  };

  type CreateSubscribeGroupRequest = {
    name: string;
    description: string;
  };

  type CreateSubscribeRequest = {
    name: string;
    description: string;
    unit_price: number;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
    deduction_ratio: number;
    allow_deduction: boolean;
    reset_cycle: number;
    renewal_reset: boolean;
  };

  type CreateTicketFollowRequest = {
    ticket_id: number;
    from: string;
    type: number;
    content: string;
  };

  type CreateUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
    auth_identifier: string;
  };

  type CreateUserRequest = {
    email: string;
    telephone: string;
    telephone_area_code: string;
    password: string;
    product_id: number;
    duration: number;
    referer_user: string;
    refer_code: string;
    balance: number;
    commission: number;
    gift_amount: number;
    is_admin: boolean;
  };

  type CreateUserSubscribeRequest = {
    user_id: number;
    expired_at: number;
    traffic: number;
    subscribe_id: number;
  };

  type CurrencyConfig = {
    currency_unit: string;
    currency_symbol: string;
  };

  type DeleteAnnouncementRequest = {
    id: number;
  };

  type DeleteApplicationRequest = {
    id: number;
  };

  type DeleteApplicationVersionRequest = {
    id: number;
  };

  type DeleteCouponRequest = {
    id: number;
  };

  type DeleteDocumentRequest = {
    id: number;
  };

  type DeleteNodeGroupRequest = {
    id: number;
  };

  type DeleteNodeRequest = {
    id: number;
  };

  type DeleteRuleGroupRequest = {
    id: number;
  };

  type DeleteSubscribeGroupRequest = {
    id: number;
  };

  type DeleteSubscribeRequest = {
    id: number;
  };

  type DeleteUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
  };

  type DeleteUserDeivceRequest = {
    id: number;
  };

  type DeleteUserParams = {
    id: number;
  };

  type Document = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    show: boolean;
    created_at: number;
    updated_at: number;
  };

  type EmailAuthticateConfig = {
    enable: boolean;
    enable_verify: boolean;
    enable_domain_suffix: boolean;
    domain_suffix_list: string;
  };

  type EpayConfig = {
    pid: string;
    url: string;
    key: string;
  };

  type Follow = {
    id: number;
    ticket_id: number;
    from: string;
    type: number;
    content: string;
    created_at: number;
  };

  type GetAllPaymentConfigResponse = {
    list: PaymentConfig[];
  };

  type GetAnnouncementListParams = {
    page: number;
    size: number;
    show?: boolean;
    pinned?: boolean;
    popup?: boolean;
    search?: string;
  };

  type GetAnnouncementListRequest = {
    page: number;
    size: number;
    show?: boolean;
    pinned?: boolean;
    popup?: boolean;
    search?: string;
  };

  type GetAnnouncementListResponse = {
    total: number;
    list: Announcement[];
  };

  type GetAnnouncementParams = {
    id: number;
  };

  type GetAnnouncementRequest = {
    id: number;
  };

  type GetAuthMethodConfigParams = {
    method: string;
  };

  type GetAuthMethodConfigRequest = {
    method: string;
  };

  type GetAuthMethodListResponse = {
    list: AuthMethodConfig[];
  };

  type GetCouponListParams = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListRequest = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListResponse = {
    total: number;
    list: Coupon[];
  };

  type GetDetailRequest = {
    id: number;
  };

  type GetDocumentDetailRequest = {
    id: number;
  };

  type GetDocumentListParams = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListRequest = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListResponse = {
    total: number;
    list: Document[];
  };

  type GetMessageLogListParams = {
    page: number;
    size: number;
    type: string;
    platform?: string;
    to?: string;
    subject?: string;
    content?: string;
    status?: number;
  };

  type GetMessageLogListRequest = {
    page: number;
    size: number;
    type: string;
    platform?: string;
    to?: string;
    subject?: string;
    content?: string;
    status?: number;
  };

  type GetMessageLogListResponse = {
    total: number;
    list: MessageLog[];
  };

  type GetNodeDetailParams = {
    id: number;
  };

  type GetNodeDetailRequest = {
    id: number;
  };

  type GetNodeGroupListResponse = {
    total: number;
    list: ServerGroup[];
  };

  type GetNodeListParams = {
    page: number;
    size: number;
    tag?: string;
    group_id?: number;
    search?: string;
  };

  type GetNodeMultiplierResponse = {
    periods: TimePeriod[];
  };

  type GetNodeServerListRequest = {
    page: number;
    size: number;
    tag?: string;
    group_id?: number;
    search?: string;
  };

  type GetNodeServerListResponse = {
    total: number;
    list: Server[];
  };

  type GetOrderListParams = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    subscribe_id?: number;
    search?: string;
  };

  type GetOrderListRequest = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    subscribe_id?: number;
    search?: string;
  };

  type GetOrderListResponse = {
    total: number;
    list: Order[];
  };

  type GetRuleGroupResponse = {
    total: number;
    list: ServerRuleGroup[];
  };

  type GetSubscribeDetailsParams = {
    id: number;
  };

  type GetSubscribeDetailsRequest = {
    id: number;
  };

  type GetSubscribeGroupListResponse = {
    list: SubscribeGroup[];
    total: number;
  };

  type GetSubscribeListParams = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetSubscribeListRequest = {
    page: number;
    size: number;
    group_id?: number;
    search?: string;
  };

  type GetSubscribeListResponse = {
    list: SubscribeItem[];
    total: number;
  };

  type GetTicketListParams = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListRequest = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListResponse = {
    total: number;
    list: Ticket[];
  };

  type GetTicketParams = {
    id: number;
  };

  type GetTicketRequest = {
    id: number;
  };

  type GetUserAuthMethodRequest = {
    user_id: number;
  };

  type GetUserAuthMethodResponse = {
    auth_methods: UserAuthMethod[];
  };

  type GetUserDetailParams = {
    id: number;
  };

  type GetUserListParams = {
    page: number;
    size: number;
    search?: string;
  };

  type GetUserListRequest = {
    page: number;
    size: number;
    search?: string;
  };

  type GetUserListResponse = {
    total: number;
    list: User[];
  };

  type GetUserLoginLogsParams = {
    page: number;
    size: number;
    user_id: number;
  };

  type GetUserLoginLogsRequest = {
    page: number;
    size: number;
    user_id: number;
  };

  type GetUserLoginLogsResponse = {
    list: UserLoginLog[];
    total: number;
  };

  type GetUserSubscribeDevicesParams = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id: number;
  };

  type GetUserSubscribeDevicesRequest = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id: number;
  };

  type GetUserSubscribeDevicesResponse = {
    list: UserDevice[];
    total: number;
  };

  type GetUserSubscribeListRequest = {
    page: number;
    size: number;
    user_id: number;
  };

  type GetUserSubscribeListResponse = {
    list: UserSubscribe[];
    total: number;
  };

  type GetUserSubscribeLogsParams = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id?: number;
  };

  type GetUserSubscribeLogsRequest = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id?: number;
  };

  type GetUserSubscribeLogsResponse = {
    list: UserSubscribeLog[];
    total: number;
  };

  type GetUserSubscribeParams = {
    page: number;
    size: number;
    user_id: number;
  };

  type GetUserSubscribeTrafficLogsParams = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id: number;
  };

  type GetUserSubscribeTrafficLogsRequest = {
    page: number;
    size: number;
    user_id: number;
    subscribe_id: number;
  };

  type GetUserSubscribeTrafficLogsResponse = {
    list: TrafficLog[];
    total: number;
  };

  type Hysteria2 = {
    port: number;
    hop_ports: string;
    hop_interval: number;
    obfs_password: string;
    security_config: SecurityConfig;
  };

  type InviteConfig = {
    forced_invite: boolean;
    referral_percentage: number;
    only_first_purchase: boolean;
  };

  type KickOfflineRequest = {
    id: number;
  };

  type LogResponse = {
    list: Record<string, any>;
  };

  type MessageLog = {
    id: number;
    type: string;
    platform: string;
    to: string;
    subject: string;
    content: string;
    status: number;
    created_at: number;
    updated_at: number;
  };

  type MobileAuthenticateConfig = {
    enable: boolean;
    limit: number;
    interval: number;
    expire_time: number;
  };

  type NodeConfig = {
    node_secret: string;
    node_pull_interval: number;
    node_push_interval: number;
  };

  type NodeRelay = {
    host: string;
    port: number;
    prefix: string;
  };

  type NodeSortRequest = {
    sort: SortItem[];
  };

  type NodeStatus = {
    online_users: OnlineUser[];
    status: ServerStatus;
    last_at: number;
  };

  type OnlineUser = {
    uid: number;
    ip: string;
  };

  type Order = {
    id: number;
    user_id: number;
    order_no: string;
    type: number;
    quantity: number;
    price: number;
    amount: number;
    gift_amount: number;
    discount: number;
    coupon: string;
    coupon_discount: number;
    commission?: number;
    method: string;
    fee_amount: number;
    trade_no: string;
    status: number;
    subscribe_id: number;
    created_at: number;
    updated_at: number;
  };

  type OrderDetail = {
    id: number;
    user_id: number;
    order_no: string;
    type: number;
    quantity: number;
    price: number;
    amount: number;
    gift_amount: number;
    discount: number;
    coupon: string;
    coupon_discount: number;
    commission?: number;
    method: string;
    fee_amount: number;
    trade_no: string;
    status: number;
    subscribe_id: number;
    subscribe: Subscribe;
    created_at: number;
    updated_at: number;
  };

  type OrdersStatistics = {
    date?: string;
    amount_total: number;
    new_order_amount: number;
    renewal_order_amount: number;
    list?: OrdersStatistics[];
  };

  type PaymentConfig = {
    id: number;
    name: string;
    mark: string;
    icon?: string;
    domain?: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent?: number;
    fee_amount?: number;
    enable: boolean;
  };

  type PlatformInfo = {
    platform: string;
    platform_url: string;
    platform_field_description: Record<string, any>;
  };

  type PlatformResponse = {
    list: PlatformInfo[];
  };

  type RegisterConfig = {
    stop_register: boolean;
    enable_trial: boolean;
    trial_subscribe: number;
    trial_time: number;
    trial_time_unit: string;
    enable_ip_register_limit: boolean;
    ip_register_limit: number;
    ip_register_limit_duration: number;
  };

  type Response = {
    /** 状态码 */
    code?: number;
    /** 消息 */
    msg?: string;
    /** 数据 */
    data?: Record<string, any>;
  };

  type RevenueStatisticsResponse = {
    today: OrdersStatistics;
    monthly: OrdersStatistics;
    all: OrdersStatistics;
  };

  type SecurityConfig = {
    sni: string;
    allow_insecure: boolean;
    fingerprint: string;
    reality_server_addr: string;
    reality_server_port: number;
    reality_private_key: string;
    reality_public_key: string;
    reality_short_id: string;
  };

  type Server = {
    id: number;
    tags: string[];
    country: string;
    city: string;
    name: string;
    server_addr: string;
    relay_mode: string;
    relay_node: NodeRelay[];
    speed_limit: number;
    traffic_ratio: number;
    group_id: number;
    protocol: string;
    config: Record<string, any>;
    enable: boolean;
    created_at: number;
    updated_at: number;
    status: NodeStatus;
    sort: number;
  };

  type ServerGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type ServerRuleGroup = {
    id: number;
    name: string;
    icon: string;
    description: string;
    enable: boolean;
    created_at: number;
    updated_at: number;
  };

  type ServerStatus = {
    cpu: number;
    mem: number;
    disk: number;
    updated_at: number;
  };

  type ServerTotalDataResponse = {
    online_user_ips: number;
    online_servers: number;
    offline_servers: number;
    today_upload: number;
    today_download: number;
    monthly_upload: number;
    monthly_download: number;
    updated_at: number;
    server_traffic_ranking_today: ServerTrafficData[];
    server_traffic_ranking_yesterday: ServerTrafficData[];
    user_traffic_ranking_today: UserTrafficData[];
    user_traffic_ranking_yesterday: UserTrafficData[];
  };

  type ServerTrafficData = {
    server_id: number;
    name: string;
    upload: number;
    download: number;
  };

  type SetNodeMultiplierRequest = {
    periods: TimePeriod[];
  };

  type Shadowsocks = {
    method: string;
    port: number;
    server_key: string;
  };

  type SiteConfig = {
    host: string;
    site_name: string;
    site_desc: string;
    site_logo: string;
  };

  type SortItem = {
    id: number;
    sort: number;
  };

  type StripeConfig = {
    public_key: string;
    secret_key: string;
    webhook_secret: string;
    payment: string;
  };

  type Subscribe = {
    id: number;
    name: string;
    description: string;
    unit_price: number;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
    sort: number;
    deduction_ratio: number;
    allow_deduction: boolean;
    reset_cycle: number;
    renewal_reset: boolean;
    created_at: number;
    updated_at: number;
  };

  type SubscribeConfig = {
    single_model: boolean;
    subscribe_path: string;
    subscribe_domain: string;
    pan_domain: boolean;
  };

  type SubscribeDiscount = {
    quantity: number;
    discount: number;
  };

  type SubscribeGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type SubscribeItem = {
    id?: number;
    name?: string;
    description?: string;
    unit_price?: number;
    unit_time?: string;
    discount?: SubscribeDiscount[];
    replacement?: number;
    inventory?: number;
    traffic?: number;
    speed_limit?: number;
    device_limit?: number;
    quota?: number;
    group_id?: number;
    server_group?: number[];
    server?: number[];
    show?: boolean;
    sell?: boolean;
    sort?: number;
    deduction_ratio?: number;
    allow_deduction?: boolean;
    reset_cycle?: number;
    renewal_reset?: boolean;
    created_at?: number;
    updated_at?: number;
    sold: number;
  };

  type SubscribeSortRequest = {
    sort: SortItem[];
  };

  type SubscribeType = {
    subscribe_types: string[];
  };

  type TelegramConfig = {
    telegram_bot_token: string;
    telegram_group_url: string;
    telegram_notify: boolean;
    telegram_web_hook_domain: string;
  };

  type TestEmailSendRequest = {
    email: string;
  };

  type TestSmsSendRequest = {
    area_code: string;
    telephone: string;
  };

  type Ticket = {
    id: number;
    title: string;
    description: string;
    user_id: number;
    follow?: Follow[];
    status: number;
    created_at: number;
    updated_at: number;
  };

  type TicketWaitRelpyResponse = {
    count: number;
  };

  type TimePeriod = {
    start_time: string;
    end_time: string;
    multiplier: number;
  };

  type TosConfig = {
    tos_content: string;
  };

  type TrafficLog = {
    id: number;
    server_id: number;
    user_id: number;
    subscribe_id: number;
    download: number;
    upload: number;
    timestamp: number;
  };

  type TransportConfig = {
    path: string;
    host: string;
    service_name: string;
  };

  type Trojan = {
    port: number;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };

  type Tuic = {
    port: number;
    security_config: SecurityConfig;
  };

  type UpdataAuthMethodConfigRequest = {
    id: number;
    method: string;
    config: Record<string, any>;
    enabled: boolean;
  };

  type UpdateAlipayF2fRequest = {
    id: number;
    name: string;
    mark: string;
    icon?: string;
    domain?: string;
    config: AlipayF2FConfig;
    fee_mode: number;
    fee_percent?: number;
    fee_amount?: number;
    enable: boolean;
  };

  type UpdateAnnouncementEnableRequest = {
    id: number;
    enable: boolean;
  };

  type UpdateAnnouncementRequest = {
    id: number;
    title: string;
    content: string;
    show: boolean;
    pinned: boolean;
    popup: boolean;
  };

  type UpdateApplicationRequest = {
    id: number;
    icon: string;
    name: string;
    description: string;
    subscribe_type: string;
    platform: ApplicationPlatform;
  };

  type UpdateApplicationVersionRequest = {
    id: number;
    url: string;
    version: string;
    description: string;
    platform: 'windows' | 'mac' | 'linux' | 'android' | 'ios' | 'harmony';
    is_default: boolean;
    application_id: number;
  };

  type UpdateCouponRequest = {
    id: number;
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type UpdateDocumentRequest = {
    id: number;
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type UpdateEpayRequest = {
    id: number;
    name: string;
    mark: string;
    icon?: string;
    domain?: string;
    config: EpayConfig;
    fee_mode: number;
    fee_percent?: number;
    fee_amount?: number;
    enable: boolean;
  };

  type UpdateNodeGroupRequest = {
    id: number;
    name: string;
    description: string;
  };

  type UpdateNodeRequest = {
    id: number;
    tags: string[];
    country: string;
    city: string;
    name: string;
    server_addr: string;
    relay_mode: string;
    relay_node: NodeRelay[];
    speed_limit: number;
    traffic_ratio: number;
    group_id: number;
    protocol: string;
    config: Record<string, any>;
    enable: boolean;
    sort: number;
  };

  type UpdateOrderStatusRequest = {
    id: number;
    status: number;
    method?: string;
    trade_no?: string;
  };

  type UpdateRuleGroupRequest = {
    id: number;
    name: string;
    icon: string;
    description: string;
    enable: boolean;
  };

  type UpdateStripeRequest = {
    id: number;
    name: string;
    mark: string;
    icon?: string;
    domain?: string;
    config: StripeConfig;
    fee_mode: number;
    fee_percent?: number;
    fee_amount?: number;
    enable: boolean;
  };

  type UpdateSubscribeGroupRequest = {
    id: number;
    name: string;
    description: string;
  };

  type UpdateSubscribeRequest = {
    id: number;
    name: string;
    description: string;
    unit_price: number;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    group_id: number;
    server_group: number[];
    server: number[];
    show: boolean;
    sell: boolean;
    sort: number;
    deduction_ratio: number;
    allow_deduction: boolean;
    reset_cycle: number;
    renewal_reset: boolean;
  };

  type UpdateTicketStatusRequest = {
    id: number;
    status: number;
  };

  type UpdateUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
    auth_identifier: string;
  };

  type UpdateUserBasiceInfoRequest = {
    user_id: number;
    password: string;
    avatar: string;
    balance: number;
    commission: number;
    gift_amount: number;
    telegram: number;
    refer_code: string;
    referer_id: number;
    enable: boolean;
    is_admin: boolean;
  };

  type UpdateUserNotifySettingRequest = {
    user_id: number;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
  };

  type UpdateUserSubscribeRequest = {
    user_subscribe_id: number;
    subscribe_id: number;
    traffic: number;
    expired_at: number;
    upload: number;
    download: number;
  };

  type User = {
    id: number;
    avatar: string;
    balance: number;
    commission: number;
    gift_amount: number;
    telegram: number;
    refer_code: string;
    referer_id: number;
    enable: boolean;
    is_admin?: boolean;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
    auth_methods: UserAuthMethod[];
    user_devices: UserDevice[];
    created_at: number;
    updated_at: number;
    deleted_at?: number;
    is_del?: boolean;
  };

  type UserAffiliate = {
    email: string;
    avatar: string;
    registered_at: number;
    enable: boolean;
  };

  type UserAuthMethod = {
    auth_type: string;
    auth_identifier: string;
    verified: boolean;
  };

  type UserBalanceLog = {
    id: number;
    user_id: number;
    amount: number;
    type: number;
    order_id: number;
    balance: number;
    created_at: number;
  };

  type UserDevice = {
    id: number;
    ip: string;
    imei: string;
    user_agent: string;
    online: boolean;
    enabled: boolean;
    created_at: number;
    updated_at: number;
  };

  type UserLoginLog = {
    id: number;
    user_id: number;
    login_ip: string;
    user_agent: string;
    success: boolean;
    created_at: number;
  };

  type UserStatistics = {
    date?: string;
    register: number;
    new_order_users: number;
    renewal_order_users: number;
    list?: UserStatistics[];
  };

  type UserStatisticsResponse = {
    today: UserStatistics;
    monthly: UserStatistics;
    all: UserStatistics;
  };

  type UserSubscribe = {
    id: number;
    user_id: number;
    order_id: number;
    subscribe_id: number;
    subscribe: Subscribe;
    start_time: number;
    expire_time: number;
    reset_time: number;
    traffic: number;
    download: number;
    upload: number;
    token: string;
    status: number;
    created_at: number;
    updated_at: number;
  };

  type UserSubscribeLog = {
    id: number;
    user_id: number;
    user_subscribe_id: number;
    token: string;
    ip: string;
    user_agent: string;
    created_at: number;
  };

  type UserTrafficData = {
    user_id: number;
    email: string;
    upload: number;
    download: number;
  };

  type VerifyCodeConfig = {
    verify_code_expire_time: number;
    verify_code_limit: number;
    verify_code_interval: number;
  };

  type VerifyConfig = {
    turnstile_site_key: string;
    turnstile_secret: string;
    enable_login_verify: boolean;
    enable_register_verify: boolean;
    enable_reset_password_verify: boolean;
  };

  type Vless = {
    port: number;
    flow: string;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };

  type Vmess = {
    port: number;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };
}
