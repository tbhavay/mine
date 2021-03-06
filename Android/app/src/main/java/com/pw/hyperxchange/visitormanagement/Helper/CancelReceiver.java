package com.pw.hyperxchange.visitormanagement.Helper;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.pw.hyperxchange.visitormanagement.Objects.Visit;

public class CancelReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Visit v = intent.getParcelableExtra(Constants.PARAM_VISIT);
        v.cancelNotification(context);
        v.cancel();
        //System.out.println(v.getVisitor().getFirstName() + " " + v.getVisitor().getLastName());
    }
}
