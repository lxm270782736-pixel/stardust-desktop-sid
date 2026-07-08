/* Host-provided @astribot/ui — shared shadcn/Radix components */
const U = window.__ASTRIBOT_SHARED__.UI;
export default U;
export const {
  // Utility
  cn,
  useAsyncToggleState,
  // Avatar
  Avatar, AvatarImage, AvatarFallback,
  // Badge
  Badge, badgeVariants,
  // Button
  Button, buttonVariants,
  // Card
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
  // Collapsible
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  // Dialog
  Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
  // DropdownMenu
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup,
  DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuRadioGroup,
  // Form
  useFormField, Form, FormItem, FormLabel, FormControl,
  FormDescription, FormMessage, FormField,
  // HoldButton
  HoldButton,
  // Input
  Input,
  // MjpegImg
  MjpegImg,
  // Label
  Label,
  // Popover
  Popover, PopoverTrigger, PopoverContent,
  // Progress
  Progress,
  // Select
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
  SelectLabel, SelectItem, SelectSeparator,
  // Separator
  Separator,
  // Skeleton
  Skeleton,
  // AsyncSwitch
  AsyncSwitch,
  // Switch
  Switch,
  // Tabs
  Tabs, TabsList, TabsTrigger, TabsContent,
  // Tooltip
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
} = U;
