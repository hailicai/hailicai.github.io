// Port your MatLab code to here.
//
// Good luck - Kaiyu

function v(inpt) {
    return Number(inpt.val());
}
$(document).ready(function(){
    // Actions go here.
    // All inputs
    var b_out1 = $("#inpt-b-out1 input");
    var b_in1 = $("#inpt-b-in1 input");
    var turns1 = $("#inpt-turns1 input");
    var a_in1 = $("#inpt-a-in1 input");
    var a_out1 = $("#inpt-a-out1 input");
    var d1 = $("#inpt-d1 input");

    var b_out2 = $("#inpt-b-out2 input");
    var b_in2 = $("#inpt-b-in2 input");
    var turns2 = $("#inpt-turns2 input");
    var a_in2 = $("#inpt-a-in2 input");
    var a_out2 = $("#inpt-a-out2 input");
    var d2 = $("#inpt-d2 input");

    var air_gap = $("#inpt-air-gap input");
    var dy = $("#inpt-dy input");
    var dx = $("#inpt-dx input");

    var L1 = $("#output-l1 p.out-value");
    var L2 = $("#output-l2 p.out-value");
    var M = $("#output-M p.out-value");
    var K = $("#output-k p.out-value");
    
   $("#calc-btn").click(function(){
    // Calculate here.
    var ain1 = v(a_in1)/1000;
    var aout1 = v(a_out1)/1000;
    var bin1 = v(b_in1)/1000;
    var bout1 = v(b_out1)/1000;
    var ain2 = v(a_in2)/1000;
    var aout2 = v(a_out2)/1000;
    var bin2 = v(b_in2)/1000;
    var bout2 = v(b_out2)/1000;
    var di1 = v(d1)/1000;
    var di2 = v(d2)/1000;
    var h = v(air_gap)/1000;
    var w1 = v(turns1);
    var w2 = v(turns2);
    var dx_ = v(dx)/1000;
    var dy_ = v(dy)/1000;
    var x1 = aout1*2;
    var y1 = bout1*2;
    var x2 = aout2*2;
    var y2 = bout2*2;
    var r1 = di1/2;
    var r2 = di2/2;
    var CW1 = (aout1 - ain1 - w1*di1)/(w1-1);
    var CW2 = (aout2 - ain2 - w2*di2)/(w2-1);
    var l1,l2,i,j,m1,m2,n1,n2,dx0,dy0,k;
    var Lm = 0;
    var Ls = 0;
    var Lmm = 0;
    var M1=[];
    var M2=[];

    for (i=1;i<=w1;i++){
    	m1 = x1 - 4*(r1 + CW1/2)*(i-1);
      n1 = y1 - 4*(r1 + CW1/2)*(i-1);
      M1 = Mrectangle_parallel(m1,n1,1,1,0.5,0.5,r1,0);
      Ls = Ls + M1[0];
    }

    for (i=1;i<w1;i++) {
        m1 = x1 - 4*(r1 + CW1/2)*(i-1);
        n1 = y1 - 4*(r1 + CW1/2)*(i-1);
        for (j=(1+i);j<=w1;j++) {
           m2 = x1 - 4*(r1+CW1/2)*(j-1);
           n2 = y1 - 4*(r1+CW1/2)*(j-1);
           dx0 = (j-i)*(2*r1+CW1);
           dy0 = (j-i)*(2*r1+CW1);
           M2 = Mrectangle_parallel(m1,n1,m2,n2,dx0,dy0,r1,0);
           Lm = Lm + M2[2];
        }
      }
      
    l1 = Ls + Lm*2;
    Ls = 0;
    Lm = 0;

    for (i=1;i<=w2;i++) {
         m1 = x2 - 4*(r2+CW2/2)*(i-1);
         n1 = y2 - 4*(r2+CW2/2)*(i-1);
         M1 = Mrectangle_parallel(m1,n1,1,1,0.5,0.5,r2,0);
         Ls = Ls + M1[0];
      }

    for (i=1;i<w2;i++) {
         m1 = x2 - 4*(r2+CW2/2)*(i-1);
         n1 = y2 - 4*(r2+CW2/2)*(i-1);
         for (j=(1+i);j<=w2;j++) {
            m2 = x2 - 4*(r2+CW2/2)*(j-1);
            n2 = y2 - 4*(r2+CW2/2)*(j-1);
            dx0 = (j-i)*(2*r2+CW2);
            dy0 = (j-i)*(2*r2+CW2);
            M2 = Mrectangle_parallel(m1,n1,m2,n2,dx0,dy0,r2,0);
            Lm = Lm + M2[2];
          }
      }
    
    l2 = Ls + Lm*2;
    Lm = 0;

    for (i=1;i<=w1;i++) {
         m1 = x1 - 4*(r1+CW1/2)*(i-1);
         n1 = y1 - 4*(r1+CW1/2)*(i-1);
         for (j=1;j<=w2;j++) {
            m2 = x2 - 4*(r2+CW2/2)*(j-1);
            n2 = y2 - 4*(r2+CW2/2)*(j-1);
            dx0 = dx_ + j*(2*r2+CW2)-i*(2*r1+CW1);
            dy0 = dy_ + j*(2*r2+CW2)-i*(2*r1+CW1);
            M2 = Mrectangle_parallel(m1,n1,m2,n2,dx0,dy0,r1,h);
            Lm = Lm + M2[2];
         }
      }
    Lmm = Lm;
    k = Lmm / Math.sqrt(l1*l2);
  
    L1.html((l1*Math.pow(10,6)).toPrecision(7));
    L2.html((l2*Math.pow(10,6)).toPrecision(7));
    M.html((Lmm*Math.pow(10,6)).toPrecision(7));
    K.html(k.toPrecision(6));
    });

});

function Mrectangle_parallel(a1,b1,a2,b2,dx_,dy_,r,h){
	var d15,d26,a15,b15,c15,a26,b26,c26,d1,d2,h15,h17,h26,h28,h37,h35,h48,h46;
  var M15,M17,M26,M28,M35,M37,M46,M48,L1,L2,Mrec;
  var M11 = [];
  	if (dx_>=0) {
      d15 = dx_ - a1;
   } else {
      d15 = -(dx_ + a2);
   }
   if (dy_>=0) {
      d26 = dy_ - b1;
   } else {
      d26 = -(dy_ + b2);
   }
   a15=a1+a2+d15;
   b15=a1+d15;
   c15=a2+d15;
   a26=b1+b2+d26;
   b26=b1+d26;
   c26=b2+d26;

   d1 = Math.sqrt(a1*a1 + b1*b1);
   d2 = Math.sqrt(a2*a2 + b2*b2);
   h15 = Math.sqrt(h*h + dy_*dy_);
   h17 = Math.sqrt(h*h + (b2+dy_)*(b2+dy_));
   h26 = Math.sqrt(h*h + dx_*dx_);
   h28 = Math.sqrt(h*h + (a2+dx_)*(a2+dx_));
   h37 = Math.sqrt(h*h + (b2+dy_-b1)*(b2+dy_-b1));
   h35 = Math.sqrt(h*h + (b1-dy_)*(b1-dy_));
   h48 = Math.sqrt(h*h + (a2+dx_-a1)*(a2+dx_-a1));
   h46 = Math.sqrt(h*h + (a1-dx_)*(a1-dx_));

   M15=ParallelMutual(a15,b15,c15,d15,h15);
   M17 = -ParallelMutual(a15,b15,c15,d15,h17);
   M26=ParallelMutual(a26,b26,c26,d26,h26);
   M28 = -ParallelMutual(a26,b26,c26,d26,h28);
   M35 = -ParallelMutual(a15,b15,c15,d15,h35);
   M37=ParallelMutual(a15,b15,c15,d15,h37);
   M46 = -ParallelMutual(a26,b26,c26,d26,h46);
   M48=ParallelMutual(a26,b26,c26,d26,h48);

   Mrec=M15+M17+M26+M28+M35+M37+M46+M48;
   temp1 = a1*Math.log(2*a1*b1 / (r * (a1+d1)));
   temp2 = b1*Math.log(2*a1*b1 / (r * (b1+d1))) + 2*d1 - 7*(a1+b1) / 4;
   L1 = 4*Math.pow(10,-7) * (temp1 + temp2);
   temp3 = a2*Math.log(2*a2*b2 / (r * (a2+d2)));
   temp4 = b2*Math.log(2*a2*b2 / (r * (b2+d2))) + 2*d2 - 7*(a2+b2) / 4;
   L2 = 4*Math.pow(10,-7) * (temp3 + temp4);
   M11 = [L1,L2,Mrec];
   return M11;
}

function ParallelMutual(A,B,C,D,H){
   var M,temp1,temp2,temp3,temp4,temp5,temp6,temp7,temp8;
   temp1 = A*Math.log(A + Math.sqrt(A*A+H*H));
   temp2 = Math.sqrt(A*A+H*H);
   temp3 = B*Math.log(B + Math.sqrt(B*B+H*H));
   temp4 = Math.sqrt(B*B+H*H);
   temp5 = C*Math.log(C + Math.sqrt(C*C+H*H));
   temp6 = Math.sqrt(C*C+H*H);
   temp7 = D*Math.log(D + Math.sqrt(D*D+H*H));
   temp8 = Math.sqrt(D*D+H*H);
   M = Math.pow(10,-7)*(temp1 - temp2 - (temp3-temp4) - (temp5-temp6) + temp7 - temp8);
   return M;
}



