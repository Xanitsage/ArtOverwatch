import { Shield, FileText, Scale, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LegalPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Legal Center</h1>
      </div>
      
      <p className="text-muted-foreground">
        Important legal information for Artist Corp members, partners, and stakeholders.
      </p>
      
      <Tabs defaultValue="terms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          <TabsTrigger value="copyright">Copyright</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" /> Terms of Service
              </CardTitle>
              <CardDescription>Last updated: June 15, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">1. Agreement to Terms</h3>
              <p>
                By accessing or using the Quadra Vision platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
              
              <h3 className="text-lg font-medium">2. Use License</h3>
              <p>
                Permission is granted to temporarily access the materials on Quadra Vision's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
              
              <h3 className="text-lg font-medium">3. Creative Nexus Structure</h3>
              <p>
                The Creative Nexus structure provided through this platform is designed to facilitate the management of creative assets, revenue distribution, and ownership rights. All users must adhere to the governance rules established within their respective Creative Nexus entities.
              </p>
              
              <h3 className="text-lg font-medium">4. Treasury Management</h3>
              <p>
                Users are responsible for all financial activities conducted through the Treasury features. Art Overwatch provides tools for transparency and management but does not guarantee financial outcomes or provide financial advice.
              </p>
              
              <h3 className="text-lg font-medium">5. Termination</h3>
              <p>
                Art Overwatch may terminate or suspend access to our platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" /> Privacy Policy
              </CardTitle>
              <CardDescription>Last updated: June 15, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">1. Information Collection</h3>
              <p>
                We collect information that you provide directly to us, such as when you create or modify your account, request services, contact customer support, or otherwise communicate with us.
              </p>
              
              <h3 className="text-lg font-medium">2. Use of Information</h3>
              <p>
                We use the information we collect to provide, maintain, and improve our services, such as to process transactions, send you related information, and provide customer support.
              </p>
              
              <h3 className="text-lg font-medium">3. Information Sharing</h3>
              <p>
                We may share the information we collect with third parties who need to access it to perform services on our behalf, such as our hosting providers and payment processors.
              </p>
              
              <h3 className="text-lg font-medium">4. Data Security</h3>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
              </p>
              
              <h3 className="text-lg font-medium">5. Your Rights</h3>
              <p>
                You may access, update, or delete your information by contacting us. Note that we may retain certain information as required by law or for legitimate business purposes.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="copyright" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" /> Copyright Policy
              </CardTitle>
              <CardDescription>Last updated: June 15, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">1. Copyright Protection</h3>
              <p>
                All content included on this platform, such as text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Art Overwatch or its content suppliers and protected by international copyright laws.
              </p>
              
              <h3 className="text-lg font-medium">2. User-Generated Content</h3>
              <p>
                By uploading content to the platform, you grant Art Overwatch a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to use, store, display, reproduce, modify, create derivative works, perform, and distribute your content on Art Overwatch solely for the purposes of operating, developing, and improving our services.
              </p>
              
              <h3 className="text-lg font-medium">3. DMCA Compliance</h3>
              <p>
                If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the required information.
              </p>
              
              <h3 className="text-lg font-medium">4. IP Rights Management</h3>
              <p>
                The platform provides tools for managing intellectual property rights within the Artist Corporation structure. Users are responsible for ensuring proper rights management and compliance with applicable laws.
              </p>
              
              <h3 className="text-lg font-medium">5. Fair Use</h3>
              <p>
                Art Overwatch respects the intellectual property of others and asks users to do the same. Fair use of copyrighted material is permitted in accordance with applicable copyright laws.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Compliance Information
              </CardTitle>
              <CardDescription>Last updated: June 15, 2023</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">1. Regulatory Compliance</h3>
              <p>
                Art Overwatch is committed to complying with all applicable laws and regulations. We maintain appropriate policies and procedures to ensure compliance with relevant legal requirements.
              </p>
              
              <h3 className="text-lg font-medium">2. Financial Reporting</h3>
              <p>
                Users utilizing the Treasury features for financial management must comply with applicable tax laws and financial reporting requirements in their respective jurisdictions.
              </p>
              
              <h3 className="text-lg font-medium">3. Data Protection</h3>
              <p>
                We comply with applicable data protection laws, including but not limited to GDPR, CCPA, and other regional privacy regulations as applicable to our operations and users.
              </p>
              
              <h3 className="text-lg font-medium">4. Anti-Money Laundering</h3>
              <p>
                Art Overwatch implements measures to prevent money laundering and terrorist financing. Users are required to provide accurate information and may be subject to verification procedures.
              </p>
              
              <h3 className="text-lg font-medium">5. Reporting Violations</h3>
              <p>
                If you suspect any violations of laws, regulations, or our policies, please contact our compliance team immediately. We take all reports seriously and will investigate accordingly.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}